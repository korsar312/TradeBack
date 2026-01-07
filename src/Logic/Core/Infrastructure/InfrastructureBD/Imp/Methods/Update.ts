import { BDHelpers } from "./BD.Helpers.ts";
import type { BDInterface as Interface } from "../../BD.interface.ts";

export class Update extends BDHelpers implements Interface.IUpdate {
	User = this.mkUpdateEntity<Interface.User>(
		"users",
		["nickname", "role", "login", "created_at"],
		(u) => ({ nickname: u.nickname, role: u.role, login: u.login, created_at: u.createdAt }),
		{ nickname: "nickname", role: "role", login: "login", createdAt: "created_at" },
	);

	UsersAuth = this.mkUpdateEntity<Interface.UserAuth>(
		"users_auth",
		["user_id", "token_hash"],
		(a) => ({ user_id: a.userId, token_hash: a.tokenHash }),
		{ userId: "user_id", tokenHash: "token_hash" },
	);

	UserRestriction = this.mkUpdateEntity<Interface.UserRestriction>(
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
	);

	Listing = this.mkUpdateEntity<Interface.Listing>(
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
	);

	ItemCard = this.mkUpdateEntity<Interface.ItemCard>(
		"item_cards",
		["listing_id", "bank", "holder_name"],
		(i) => ({ listing_id: i.listingId, bank: i.bank, holder_name: i.name }),
		{ listingId: "listing_id", bank: "bank", name: "holder_name" },
	);

	Deal = this.mkUpdateEntity<Interface.Deal>(
		"deals",
		["listing_id", "seller_id", "buyer_id", "status"],
		(d) => ({ listing_id: d.listingId, seller_id: d.sellerId, buyer_id: d.buyerId, status: d.status }),
		{ listingId: "listing_id", sellerId: "seller_id", buyerId: "buyer_id", status: "status" },
	);

	Payment = this.mkUpdateEntity<Interface.Payment>(
		"payments",
		["deal_id", "status", "price"],
		(p) => ({ deal_id: p.dealId, status: p.status, price: p.price }),
		{ dealId: "deal_id", status: "status", price: "price" },
	);

	Delivery = this.mkUpdateEntity<Interface.Delivery>(
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
	);

	Evaluation = this.mkUpdateEntity<Interface.Evaluation>(
		"evaluations",
		["deal_id", "type", "comment", "created_at"],
		(e) => ({ deal_id: e.dealId, type: e.type, comment: e.comment, created_at: e.createdAt }),
		{ dealId: "deal_id", type: "type", comment: "comment", createdAt: "created_at" },
	);

	Chat = this.mkUpdateEntity<Interface.Chat>(
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
	);

	Message = this.mkUpdateEntity<Interface.Message>(
		"messages",
		["chat_id", "user_id", "created_at", "text"],
		(m) => ({ chat_id: m.chatId, user_id: m.userId, created_at: m.createdAt, text: m.text }),
		{ chatId: "chat_id", userId: "user_id", createdAt: "created_at", text: "text" },
	);
}
