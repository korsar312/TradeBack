import { DatabaseSync } from "node:sqlite";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { randomUUID } from "node:crypto";
import type { BDInterface as Interface } from "../BD.interface.ts";

type Row = Record<string, any>;

/** CommonJS: schema.sql рядом с скомпилированным BD.imp.js */
const SCHEMA_SQL: string = readFileSync(join(__dirname, "schema.sql"), "utf8");

class BDImp implements Interface.IAdapter {
	private db: DatabaseSync;

	public create!: Interface.IAdapter["create"];
	public read!: Interface.IAdapter["read"];
	public update!: Interface.IAdapter["update"];
	public delete!: Interface.IAdapter["delete"];

	constructor(filename: string = ":memory:") {
		this.db = new DatabaseSync(filename);
		this.initSchema();
		this.bindCrud();
	}

	/** Создание таблиц/индексов/триггеров из schema.sql */
	initSchema(): void {
		this.db.exec("PRAGMA foreign_keys = ON;");
		this.db.exec(SCHEMA_SQL);
	}

	/* ===================== helpers ===================== */

	private idOrNew(id?: string): string {
		return id && id.length > 0 ? id : randomUUID();
	}

	private getOne(sql: string, params: any[] = []): Row | null {
		const stmt = this.db.prepare(sql);
		const row = stmt.get(...params) as Row | undefined;
		return row ?? null;
	}

	private getAll(sql: string, params: any[] = []): Row[] {
		const stmt = this.db.prepare(sql);
		return (stmt.all(...params) as Row[]) ?? [];
	}

	private run(sql: string, params: any[] = []): number {
		const stmt = this.db.prepare(sql);
		const res = stmt.run(...params);
		return Number(res.changes ?? 0);
	}

	private readScalar<T>(table: string, col: string, id: string): T | null {
		const row = this.getOne(`SELECT ${col} AS v FROM ${table} WHERE id = ?`, [id]);
		return row ? (row.v as T) : null;
	}

	private updateField(table: string, col: string, id: string, value: any): number {
		return this.run(`UPDATE ${table} SET ${col} = ? WHERE id = ?`, [value, id]);
	}

	private updatePatch(table: string, id: string, patch: Record<string, any>, fieldToCol: Record<string, string>): number {
		const keys = Object.keys(patch).filter((k) => k !== "id" && patch[k] !== undefined);
		if (keys.length === 0) return 0;

		const sets: string[] = [];
		const params: any[] = [];

		for (const field of keys) {
			const col = fieldToCol[field];
			if (!col) continue;
			sets.push(`${col} = ?`);
			params.push(patch[field]);
		}

		if (sets.length === 0) return 0;
		params.push(id);

		return this.run(`UPDATE ${table} SET ${sets.join(", ")} WHERE id = ?`, params);
	}

	/**
	 * read.entity(id) + read.entity.field(id)
	 * Реализация через Proxy, чтобы не ломаться на field="name" (Function.name read-only).
	 */
	private mkReadEntity<T extends { id: string }>(
		table: string,
		readWhole: (id: string) => T | null,
		fieldToCol: Record<string, string>,
	): Interface.ReadEntity<T> {
		const callable = ((id: string) => readWhole(id)) as any;

		return new Proxy(callable, {
			get: (_target, prop: string | symbol) => {
				if (typeof prop !== "string") return undefined;

				const col = fieldToCol[prop];
				if (col) return (id: string) => this.readScalar(table, col, id);

				return undefined;
			},
		}) as any;
	}

	/**
	 * update.entity(entity) + update.entity.field(id, value) + update.entity.patch(id, patch)
	 * Proxy, чтобы работали любые имена полей.
	 */
	private mkUpdateEntity<T extends { id: string }>(
		table: string,
		fullCols: string[],
		toRow: (e: T) => Record<string, any>,
		fieldToCol: Record<string, string>,
	): Interface.UpdateEntity<T> {
		const callable = ((entity: T) => {
			const row = toRow(entity);
			const sets = fullCols.map((c) => `${c} = ?`).join(", ");
			const params = [...fullCols.map((c) => row[c]), entity.id];
			return this.run(`UPDATE ${table} SET ${sets} WHERE id = ?`, params);
		}) as any;

		const patchFn = (id: string, patch: Partial<Omit<T, "id">>) => this.updatePatch(table, id, patch as any, fieldToCol);

		return new Proxy(callable, {
			get: (_target, prop: string | symbol) => {
				if (prop === "patch") return patchFn;
				if (typeof prop !== "string") return undefined;

				const col = fieldToCol[prop];
				if (col) return (id: string, value: any) => this.updateField(table, col, id, value);

				return undefined;
			},
		}) as any;
	}

	/* ===================== CRUD binding ===================== */

	private bindCrud(): void {
		/* ===================== CREATE ===================== */
		this.create = {
			user: (d) => {
				const id = this.idOrNew(d.id);
				this.run(`INSERT INTO users (id, nickname, login, created_at) VALUES (?, ?, ?, ?)`, [id, d.nickname, d.login, d.createdAt]);
				return id;
			},

			usersAuth: (d) => {
				const id = this.idOrNew(d.id);
				this.run(`INSERT INTO users_auth (id, user_id, token_hash) VALUES (?, ?, ?)`, [id, d.userId, d.tokenHash]);
				return id;
			},

			userRestriction: (d) => {
				const id = this.idOrNew(d.id);
				this.run(
					`INSERT INTO user_restrictions (id, user_id, type, until_ts, reason, by_id, created_at)
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
					[id, d.userId, d.type, d.untilTs, d.reason, d.byId, d.createdAt],
				);
				return id;
			},

			listing: (d) => {
				const id = this.idOrNew(d.id);
				this.run(
					`INSERT INTO listings (id, seller_id, type, created_at, status, name, description)
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
					[id, d.sellerId, d.type, d.createdAt, d.status, d.name, d.desc],
				);
				return id;
			},

			itemCard: (d) => {
				const id = this.idOrNew(d.id);
				this.run(`INSERT INTO item_cards (id, listing_id, bank, holder_name) VALUES (?, ?, ?, ?)`, [
					id,
					d.listingId,
					d.bank,
					d.name,
				]);
				return id;
			},

			deal: (d) => {
				const id = this.idOrNew(d.id);
				this.run(`INSERT INTO deals (id, listing_id, seller_id, buyer_id, status) VALUES (?, ?, ?, ?, ?)`, [
					id,
					d.listingId,
					d.sellerId,
					d.buyerId,
					d.status,
				]);
				return id;
			},

			payment: (d) => {
				const id = this.idOrNew(d.id);
				this.run(`INSERT INTO payments (id, deal_id, status, price) VALUES (?, ?, ?, ?)`, [id, d.dealId, d.status, d.price]);
				return id;
			},

			delivery: (d) => {
				const id = this.idOrNew(d.id);
				this.run(
					`INSERT INTO deliveries (id, deal_id, status, track_number, departure_place, delivery_place)
           VALUES (?, ?, ?, ?, ?, ?)`,
					[id, d.dealId, d.status, d.trackNumber, d.departurePlace, d.deliveryPlace],
				);
				return id;
			},

			evaluation: (d) => {
				const id = this.idOrNew(d.id);
				this.run(`INSERT INTO evaluations (id, deal_id, type, comment, created_at) VALUES (?, ?, ?, ?, ?)`, [
					id,
					d.dealId,
					d.type,
					d.comment,
					d.createdAt,
				]);
				return id;
			},

			chat: (d) => {
				const id = this.idOrNew(d.id);
				this.run(
					`INSERT INTO chats (id, deal_id, buyer_see_time, seller_see_time, last_message_id, last_message_at)
           VALUES (?, ?, ?, ?, NULL, NULL)`,
					[id, d.dealId, d.buyerSeeTime, d.sellerSeeTime],
				);
				return id;
			},

			message: (d) => {
				const id = this.idOrNew(d.id);
				this.run(`INSERT INTO messages (id, chat_id, user_id, created_at, text) VALUES (?, ?, ?, ?, ?)`, [
					id,
					d.chatId,
					d.userId,
					d.createdAt,
					d.text,
				]);
				// last_message_* обновятся триггерами
				return id;
			},
		};

		/* ===================== READ ===================== */

		const readUser = this.mkReadEntity<Interface.User>(
			"users",
			(id) => {
				const r = this.getOne(`SELECT id, nickname, login, created_at FROM users WHERE id = ?`, [id]);
				return r ? ({ id: r.id, nickname: r.nickname, login: r.login, createdAt: r.created_at } as Interface.User) : null;
			},
			{ nickname: "nickname", login: "login", createdAt: "created_at" },
		);

		const readUsersAuth = this.mkReadEntity<Interface.UsersAuth>(
			"users_auth",
			(id) => {
				const r = this.getOne(`SELECT id, user_id, token_hash FROM users_auth WHERE id = ?`, [id]);
				return r ? ({ id: r.id, userId: r.user_id, tokenHash: r.token_hash } as Interface.UsersAuth) : null;
			},
			{ userId: "user_id", tokenHash: "token_hash" },
		);

		const readUserRestriction = this.mkReadEntity<Interface.UserRestriction>(
			"user_restrictions",
			(id) => {
				const r = this.getOne(
					`SELECT id, user_id, type, until_ts, reason, by_id, created_at
           FROM user_restrictions WHERE id = ?`,
					[id],
				);
				return r
					? ({
							id: r.id,
							userId: r.user_id,
							type: r.type,
							untilTs: r.until_ts,
							reason: r.reason,
							byId: r.by_id,
							createdAt: r.created_at,
						} as Interface.UserRestriction)
					: null;
			},
			{ userId: "user_id", type: "type", untilTs: "until_ts", reason: "reason", byId: "by_id", createdAt: "created_at" },
		);

		const readListing = this.mkReadEntity<Interface.Listing>(
			"listings",
			(id) => {
				const r = this.getOne(`SELECT id, seller_id, type, created_at, status, name, description FROM listings WHERE id = ?`, [id]);
				return r
					? ({
							id: r.id,
							sellerId: r.seller_id,
							type: r.type,
							createdAt: r.created_at,
							status: r.status,
							name: r.name,
							desc: r.description,
						} as Interface.Listing)
					: null;
			},
			{
				sellerId: "seller_id",
				type: "type",
				createdAt: "created_at",
				status: "status",
				name: "name", // НЕ падает (Proxy)
				desc: "description",
			},
		);

		const readItemCard = this.mkReadEntity<Interface.ItemCard>(
			"item_cards",
			(id) => {
				const r = this.getOne(`SELECT id, listing_id, bank, holder_name FROM item_cards WHERE id = ?`, [id]);
				return r ? ({ id: r.id, listingId: r.listing_id, bank: r.bank, name: r.holder_name } as Interface.ItemCard) : null;
			},
			{ listingId: "listing_id", bank: "bank", name: "holder_name" },
		);

		const readDeal = this.mkReadEntity<Interface.Deal>(
			"deals",
			(id) => {
				const r = this.getOne(`SELECT id, listing_id, seller_id, buyer_id, status FROM deals WHERE id = ?`, [id]);
				return r
					? ({
							id: r.id,
							listingId: r.listing_id,
							sellerId: r.seller_id,
							buyerId: r.buyer_id,
							status: r.status,
						} as Interface.Deal)
					: null;
			},
			{ listingId: "listing_id", sellerId: "seller_id", buyerId: "buyer_id", status: "status" },
		);

		const readPayment = this.mkReadEntity<Interface.Payment>(
			"payments",
			(id) => {
				const r = this.getOne(`SELECT id, deal_id, status, price FROM payments WHERE id = ?`, [id]);
				return r ? ({ id: r.id, dealId: r.deal_id, status: r.status, price: r.price } as Interface.Payment) : null;
			},
			{ dealId: "deal_id", status: "status", price: "price" },
		);

		const readDelivery = this.mkReadEntity<Interface.Delivery>(
			"deliveries",
			(id) => {
				const r = this.getOne(
					`SELECT id, deal_id, status, track_number, departure_place, delivery_place
           FROM deliveries WHERE id = ?`,
					[id],
				);
				return r
					? ({
							id: r.id,
							dealId: r.deal_id,
							status: r.status,
							trackNumber: r.track_number,
							departurePlace: r.departure_place,
							deliveryPlace: r.delivery_place,
						} as Interface.Delivery)
					: null;
			},
			{
				dealId: "deal_id",
				status: "status",
				trackNumber: "track_number",
				departurePlace: "departure_place",
				deliveryPlace: "delivery_place",
			},
		);

		const readEvaluation = this.mkReadEntity<Interface.Evaluation>(
			"evaluations",
			(id) => {
				const r = this.getOne(`SELECT id, deal_id, type, comment, created_at FROM evaluations WHERE id = ?`, [id]);
				return r
					? ({ id: r.id, dealId: r.deal_id, type: r.type, comment: r.comment, createdAt: r.created_at } as Interface.Evaluation)
					: null;
			},
			{ dealId: "deal_id", type: "type", comment: "comment", createdAt: "created_at" },
		);

		const readChat = this.mkReadEntity<Interface.Chat>(
			"chats",
			(id) => {
				const r = this.getOne(
					`SELECT id, deal_id, buyer_see_time, seller_see_time, last_message_id, last_message_at
           FROM chats WHERE id = ?`,
					[id],
				);
				return r
					? ({
							id: r.id,
							dealId: r.deal_id,
							buyerSeeTime: r.buyer_see_time,
							sellerSeeTime: r.seller_see_time,
							lastMessageId: r.last_message_id,
							lastMessageAt: r.last_message_at,
						} as Interface.Chat)
					: null;
			},
			{
				dealId: "deal_id",
				buyerSeeTime: "buyer_see_time",
				sellerSeeTime: "seller_see_time",
				lastMessageId: "last_message_id",
				lastMessageAt: "last_message_at",
			},
		);

		const readMessage = this.mkReadEntity<Interface.Message>(
			"messages",
			(id) => {
				const r = this.getOne(`SELECT id, chat_id, user_id, created_at, text FROM messages WHERE id = ?`, [id]);
				return r
					? ({ id: r.id, chatId: r.chat_id, userId: r.user_id, createdAt: r.created_at, text: r.text } as Interface.Message)
					: null;
			},
			{ chatId: "chat_id", userId: "user_id", createdAt: "created_at", text: "text" },
		);

		this.read = {
			user: readUser,
			usersAuth: readUsersAuth,
			userRestriction: readUserRestriction,
			listing: readListing,
			itemCard: readItemCard,
			deal: readDeal,
			payment: readPayment,
			delivery: readDelivery,
			evaluation: readEvaluation,
			chat: readChat,
			message: readMessage,

			listMessagesByChat: (chatId: string) => {
				const rows = this.getAll(
					`SELECT id, chat_id, user_id, created_at, text
           FROM messages
           WHERE chat_id = ?
           ORDER BY created_at ASC`,
					[chatId],
				);
				return rows.map(
					(r) => ({ id: r.id, chatId: r.chat_id, userId: r.user_id, createdAt: r.created_at, text: r.text }) as Interface.Message,
				);
			},

			listDealsByUser: (userId: string) => {
				const rows = this.getAll(
					`SELECT id, listing_id, seller_id, buyer_id, status
           FROM deals
           WHERE seller_id = ? OR buyer_id = ?
           ORDER BY id ASC`,
					[userId, userId],
				);
				return rows.map(
					(r) =>
						({
							id: r.id,
							listingId: r.listing_id,
							sellerId: r.seller_id,
							buyerId: r.buyer_id,
							status: r.status,
						}) as Interface.Deal,
				);
			},
		};

		/* ===================== UPDATE ===================== */

		this.update = {
			user: this.mkUpdateEntity<Interface.User>(
				"users",
				["nickname", "login", "created_at"],
				(u) => ({ nickname: u.nickname, login: u.login, created_at: u.createdAt }),
				{ nickname: "nickname", login: "login", createdAt: "created_at" },
			),

			usersAuth: this.mkUpdateEntity<Interface.UsersAuth>(
				"users_auth",
				["user_id", "token_hash"],
				(a) => ({ user_id: a.userId, token_hash: a.tokenHash }),
				{ userId: "user_id", tokenHash: "token_hash" },
			),

			userRestriction: this.mkUpdateEntity<Interface.UserRestriction>(
				"user_restrictions",
				["user_id", "type", "until_ts", "reason", "by_id", "created_at"],
				(r) => ({
					user_id: r.userId,
					type: r.type,
					until_ts: r.untilTs,
					reason: r.reason,
					by_id: r.byId,
					created_at: r.createdAt,
				}),
				{ userId: "user_id", type: "type", untilTs: "until_ts", reason: "reason", byId: "by_id", createdAt: "created_at" },
			),

			listing: this.mkUpdateEntity<Interface.Listing>(
				"listings",
				["seller_id", "type", "created_at", "status", "name", "description"],
				(l) => ({
					seller_id: l.sellerId,
					type: l.type,
					created_at: l.createdAt,
					status: l.status,
					name: l.name,
					description: l.desc,
				}),
				{ sellerId: "seller_id", type: "type", createdAt: "created_at", status: "status", name: "name", desc: "description" },
			),

			itemCard: this.mkUpdateEntity<Interface.ItemCard>(
				"item_cards",
				["listing_id", "bank", "holder_name"],
				(i) => ({ listing_id: i.listingId, bank: i.bank, holder_name: i.name }),
				{ listingId: "listing_id", bank: "bank", name: "holder_name" },
			),

			deal: this.mkUpdateEntity<Interface.Deal>(
				"deals",
				["listing_id", "seller_id", "buyer_id", "status"],
				(d) => ({ listing_id: d.listingId, seller_id: d.sellerId, buyer_id: d.buyerId, status: d.status }),
				{ listingId: "listing_id", sellerId: "seller_id", buyerId: "buyer_id", status: "status" },
			),

			payment: this.mkUpdateEntity<Interface.Payment>(
				"payments",
				["deal_id", "status", "price"],
				(p) => ({ deal_id: p.dealId, status: p.status, price: p.price }),
				{ dealId: "deal_id", status: "status", price: "price" },
			),

			delivery: this.mkUpdateEntity<Interface.Delivery>(
				"deliveries",
				["deal_id", "status", "track_number", "departure_place", "delivery_place"],
				(d) => ({
					deal_id: d.dealId,
					status: d.status,
					track_number: d.trackNumber,
					departure_place: d.departurePlace,
					delivery_place: d.deliveryPlace,
				}),
				{
					dealId: "deal_id",
					status: "status",
					trackNumber: "track_number",
					departurePlace: "departure_place",
					deliveryPlace: "delivery_place",
				},
			),

			evaluation: this.mkUpdateEntity<Interface.Evaluation>(
				"evaluations",
				["deal_id", "type", "comment", "created_at"],
				(e) => ({ deal_id: e.dealId, type: e.type, comment: e.comment, created_at: e.createdAt }),
				{ dealId: "deal_id", type: "type", comment: "comment", createdAt: "created_at" },
			),

			chat: this.mkUpdateEntity<Interface.Chat>(
				"chats",
				["deal_id", "buyer_see_time", "seller_see_time", "last_message_id", "last_message_at"],
				(c) => ({
					deal_id: c.dealId,
					buyer_see_time: c.buyerSeeTime,
					seller_see_time: c.sellerSeeTime,
					last_message_id: c.lastMessageId,
					last_message_at: c.lastMessageAt,
				}),
				{
					dealId: "deal_id",
					buyerSeeTime: "buyer_see_time",
					sellerSeeTime: "seller_see_time",
					lastMessageId: "last_message_id",
					lastMessageAt: "last_message_at",
				},
			),

			message: this.mkUpdateEntity<Interface.Message>(
				"messages",
				["chat_id", "user_id", "created_at", "text"],
				(m) => ({ chat_id: m.chatId, user_id: m.userId, created_at: m.createdAt, text: m.text }),
				{ chatId: "chat_id", userId: "user_id", createdAt: "created_at", text: "text" },
			),
		};

		/* ===================== DELETE ===================== */

		this.delete = {
			user: (id) => this.run(`DELETE FROM users WHERE id = ?`, [id]),
			usersAuth: (id) => this.run(`DELETE FROM users_auth WHERE id = ?`, [id]),
			userRestriction: (id) => this.run(`DELETE FROM user_restrictions WHERE id = ?`, [id]),
			listing: (id) => this.run(`DELETE FROM listings WHERE id = ?`, [id]),
			itemCard: (id) => this.run(`DELETE FROM item_cards WHERE id = ?`, [id]),
			deal: (id) => this.run(`DELETE FROM deals WHERE id = ?`, [id]),
			payment: (id) => this.run(`DELETE FROM payments WHERE id = ?`, [id]),
			delivery: (id) => this.run(`DELETE FROM deliveries WHERE id = ?`, [id]),
			evaluation: (id) => this.run(`DELETE FROM evaluations WHERE id = ?`, [id]),
			chat: (id) => this.run(`DELETE FROM chats WHERE id = ?`, [id]),
			message: (id) => this.run(`DELETE FROM messages WHERE id = ?`, [id]),
		};
	}
}

export default BDImp;
