import type { BDInterface as Interface } from "../../BD.interface.ts";
import { BDHelpers } from "./BD.Helpers.ts";

export class Create extends BDHelpers implements Interface.ICreate {
	User = (d: Interface.CreateUser) => {
		const id = this.idOrNew(d.id);
		this.run(`INSERT INTO users (id, nickname, role, login, created_at) VALUES (?, ?, ?, ?, ?)`, [
			id,
			d.nickname,
			d.role,
			d.login,
			d.createdAt,
		]);
		return id;
	};

	UsersAuth = (d: Interface.CreateUsersAuth) => {
		const id = this.idOrNew(d.id);
		this.run(`INSERT INTO users_auth (id, user_id, token_hash) VALUES (?, ?, ?)`, [id, d.userId, d.tokenHash]);
		return id;
	};

	UserRestriction = (d: Interface.CreateUserRestriction) => {
		const id = this.idOrNew(d.id);
		this.run(
			`INSERT INTO user_restrictions (id, user_id, type, until_ts, reason, by_id, created_at)
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
			[id, d.userId, d.type, d.untilTs, d.reason, d.byId, d.createdAt],
		);
		return id;
	};

	Listing = (d: Interface.CreateListing) => {
		const id = this.idOrNew(d.id);
		this.run(
			`INSERT INTO listings (id, seller_id, type, created_at, status, name, description)
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
			[id, d.sellerId, d.type, d.createdAt, d.status, d.name, d.desc],
		);
		return id;
	};

	ItemCard = (d: Interface.CreateItemCard) => {
		const id = this.idOrNew(d.id);
		this.run(`INSERT INTO item_cards (id, listing_id, bank, holder_name) VALUES (?, ?, ?, ?)`, [id, d.listingId, d.bank, d.name]);
		return id;
	};

	Deal = (d: Interface.CreateDeal) => {
		const id = this.idOrNew(d.id);
		this.run(`INSERT INTO deals (id, listing_id, seller_id, buyer_id, status) VALUES (?, ?, ?, ?, ?)`, [
			id,
			d.listingId,
			d.sellerId,
			d.buyerId,
			d.status,
		]);
		return id;
	};

	Payment = (d: Interface.CreatePayment) => {
		const id = this.idOrNew(d.id);
		this.run(`INSERT INTO payments (id, deal_id, status, price) VALUES (?, ?, ?, ?)`, [id, d.dealId, d.status, d.price]);
		return id;
	};

	Delivery = (d: Interface.CreateDelivery) => {
		const id = this.idOrNew(d.id);
		this.run(
			`INSERT INTO deliveries (id, deal_id, status, track_number, departure_place, delivery_place)
           VALUES (?, ?, ?, ?, ?, ?)`,
			[id, d.dealId, d.status, d.trackNumber, d.departurePlace, d.deliveryPlace],
		);
		return id;
	};

	Evaluation = (d: Interface.CreateEvaluation) => {
		const id = this.idOrNew(d.id);
		this.run(`INSERT INTO evaluations (id, deal_id, type, comment, created_at) VALUES (?, ?, ?, ?, ?)`, [
			id,
			d.dealId,
			d.type,
			d.comment,
			d.createdAt,
		]);
		return id;
	};

	Chat = (d: Interface.CreateChat) => {
		const id = this.idOrNew(d.id);
		this.run(
			`INSERT INTO chats (id, deal_id, buyer_see_time, seller_see_time, last_message_id, last_message_at)
           VALUES (?, ?, ?, ?, NULL, NULL)`,
			[id, d.dealId, d.buyerSeeTime, d.sellerSeeTime],
		);
		return id;
	};

	Message = (d: Interface.CreateMessage) => {
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
	};
}
