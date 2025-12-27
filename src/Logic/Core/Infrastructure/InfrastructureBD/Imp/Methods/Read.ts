import { BDHelpers } from "./BD.Helpers.ts";
import { UserInterface } from "../../../../Services/ServiceUser/User.interface.ts";
import type { BDInterface as Interface } from "../../BD.interface.ts";

export class Read extends BDHelpers implements Interface.IRead {
	User = this.mkReadEntity<UserInterface.IUser>(
		"users",
		(id) => {
			const r = this.getOne(`SELECT id, nickname, login, created_at FROM users WHERE id = ?`, [id]);
			return r ? ({ id: r.id, nickname: r.nickname, login: r.login, createdAt: r.created_at } as UserInterface.IUser) : null;
		},
		{ nickname: "nickname", login: "login", createdAt: "created_at" },
	);

	UsersAuth = this.mkReadEntity<UserInterface.IUsersAuth>(
		"users_auth",
		(id) => {
			const r = this.getOne(`SELECT id, user_id, token_hash FROM users_auth WHERE id = ?`, [id]);
			return r ? ({ id: r.id, userId: r.user_id, tokenHash: r.token_hash } as UserInterface.IUsersAuth) : null;
		},
		{ userId: "user_id", tokenHash: "token_hash" },
	);

	UserRestriction = this.mkReadEntity<UserInterface.IUserRestriction>(
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
					} as UserInterface.IUserRestriction)
				: null;
		},
		{ userId: "user_id", type: "type", untilTs: "until_ts", reason: "reason", byId: "by_id", createdAt: "created_at" },
	);

	Listing = this.mkReadEntity<Interface.Listing>(
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

	ItemCard = this.mkReadEntity<Interface.ItemCard>(
		"item_cards",
		(id) => {
			const r = this.getOne(`SELECT id, listing_id, bank, holder_name FROM item_cards WHERE id = ?`, [id]);
			return r ? ({ id: r.id, listingId: r.listing_id, bank: r.bank, name: r.holder_name } as Interface.ItemCard) : null;
		},
		{ listingId: "listing_id", bank: "bank", name: "holder_name" },
	);

	Deal = this.mkReadEntity<Interface.Deal>(
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

	Payment = this.mkReadEntity<Interface.Payment>(
		"payments",
		(id) => {
			const r = this.getOne(`SELECT id, deal_id, status, price FROM payments WHERE id = ?`, [id]);
			return r ? ({ id: r.id, dealId: r.deal_id, status: r.status, price: r.price } as Interface.Payment) : null;
		},
		{ dealId: "deal_id", status: "status", price: "price" },
	);

	Delivery = this.mkReadEntity<Interface.Delivery>(
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

	Evaluation = this.mkReadEntity<Interface.Evaluation>(
		"evaluations",
		(id) => {
			const r = this.getOne(`SELECT id, deal_id, type, comment, created_at FROM evaluations WHERE id = ?`, [id]);
			return r
				? ({ id: r.id, dealId: r.deal_id, type: r.type, comment: r.comment, createdAt: r.created_at } as Interface.Evaluation)
				: null;
		},
		{ dealId: "deal_id", type: "type", comment: "comment", createdAt: "created_at" },
	);

	Chat = this.mkReadEntity<Interface.Chat>(
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

	Message = this.mkReadEntity<Interface.Message>(
		"messages",
		(id) => {
			const r = this.getOne(`SELECT id, chat_id, user_id, created_at, text FROM messages WHERE id = ?`, [id]);
			return r
				? ({ id: r.id, chatId: r.chat_id, userId: r.user_id, createdAt: r.created_at, text: r.text } as Interface.Message)
				: null;
		},
		{ chatId: "chat_id", userId: "user_id", createdAt: "created_at", text: "text" },
	);

	ListMessagesByChat = (chatId: string) => {
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
	};

	ListDealsByUser = (userId: string) => {
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
	};

	UsersAuthByLogin = (login: string): UserInterface.IUsersAuth | null => {
		return null;
	};
}
