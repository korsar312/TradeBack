import { index, integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";
import type { BDInterface } from "../BD.interface.ts";

const table = {
	users: {
		id: text("id").primaryKey(),
		nickname: text("nickname").notNull(),
		role: text("role").$type<BDInterface.User["role"]>().notNull(),
		login: text("login").notNull(),
		telegramId: text("telegram_id"),
		createdAt: integer("created_at").notNull(),
	},
	usersAuth: {
		id: text("id").primaryKey(),
		userId: text("user_id").notNull(),
		tokenHash: text("token_hash").notNull(),
	},
	userRestrictions: {
		id: text("id").primaryKey(),
		userId: text("user_id").notNull(),
		type: text("type").$type<BDInterface.UserRestriction["type"]>().notNull(),
		untilTs: integer("until_ts").notNull(),
		reason: text("reason").notNull(),
		byId: text("by_id"),
		createdAt: integer("created_at").notNull(),
	},
	listings: {
		id: text("id").primaryKey(),
		sellerId: text("seller_id").notNull(),
		saleKind: text("sale_kind").$type<BDInterface.Listing["saleKind"]>().notNull(),
		status: text("status").$type<BDInterface.Listing["status"]>().notNull(),
		name: text("name").notNull(),
		desc: text("description").notNull(),
		price: integer("price").notNull(),
		createdAt: integer("created_at").notNull(),
		updatedAt: integer("updated_at").notNull(),
	},
	itemCards: {
		id: text("id").primaryKey(),
		listingId: text("listing_id").notNull(),
		bank: text("bank").$type<BDInterface.ItemCard["bank"]>().notNull(),
		age: text("age").notNull(),
		name: text("name").notNull(),
	},
	deals: {
		id: text("id").primaryKey(),
		listingId: text("listing_id").notNull(),
		sellerId: text("seller_id").notNull(),
		buyerId: text("buyer_id").notNull(),
		status: text("status").$type<BDInterface.Deal["status"]>().notNull(),
		buyerCancelAt: integer("buyer_cancel_at"),
		sellerCancelAt: integer("seller_cancel_at"),
		createdAt: integer("created_at").notNull(),
	},
	payments: {
		id: text("id").primaryKey(),
		dealId: text("deal_id").notNull(),
		status: text("status").$type<BDInterface.Payment["status"]>().notNull(),
		price: integer("price").notNull(),
		fee: integer("fee").notNull(),
		createdAt: integer("created_at").notNull(),
		updatedAt: integer("updated_at").notNull(),
	},
	deliveries: {
		id: text("id").primaryKey(),
		dealId: text("deal_id").notNull(),
		status: text("status").$type<BDInterface.Delivery["status"]>().notNull(),
		trackNumber: integer("track_number"),
		departurePlace: text("departure_place"),
		deliveryPlace: text("delivery_place"),
	},
	evaluations: {
		id: text("id").primaryKey(),
		dealId: text("deal_id").notNull(),
		type: text("type").$type<BDInterface.Evaluation["type"]>().notNull(),
		comment: text("comment").notNull(),
		createdAt: integer("created_at").notNull(),
	},
	chats: {
		id: text("id").primaryKey(),
		dealId: text("deal_id").notNull(),
		buyerSeeTime: integer("buyer_see_time").notNull(),
		sellerSeeTime: integer("seller_see_time").notNull(),
		lastMessageId: text("last_message_id"),
		lastMessageAt: integer("last_message_at"),
	},
	messages: {
		id: text("id").primaryKey(),
		chatId: text("chat_id").notNull(),
		userId: text("user_id").notNull(),
		createdAt: integer("created_at").notNull(),
		text: text("text").notNull(),
	},
	transaction: {
		id: text("id").primaryKey(),
		userId: text("user_id").notNull(),
		operationId: text("operation_id").notNull(),
		paymentId: text("payment_id"),
		type: text("type").$type<BDInterface.Transaction["type"]>().notNull(),
		direction: text("direction").$type<BDInterface.Transaction["direction"]>().notNull(),
		walletBeforeSnapshot: integer("wallet_before_snapshot").notNull(),
		walletAfterSnapshot: integer("wallet_after_snapshot").notNull(),
		holdBeforeSnapshot: integer("hold_before_snapshot").notNull(),
		holdAfterSnapshot: integer("hold_after_snapshot").notNull(),
		account: text("account").$type<BDInterface.Transaction["account"]>().notNull(),
		amount: integer("amount").notNull(),
		createdAt: integer("created_at").notNull(),
	},
} satisfies BDInterface.TTable;

export const __users = sqliteTable("users", table.users, (t) => ({
	ux_users_login: uniqueIndex("ux_users_login").on(t.login),
}));
export const __usersAuth = sqliteTable("usersAuth", table.usersAuth);
export const __userRestrictions = sqliteTable("userRestrictions", table.userRestrictions);
export const __listings = sqliteTable("listings", table.listings, (t) => ({
	ix_listings_status_saleKind_id: index("ix_listings_status_sale_kind_id").on(t.status, t.saleKind, t.id),
	ix_listings_sellerId: index("ix_listings_seller_id").on(t.sellerId),
}));
export const __itemCards = sqliteTable("itemCards", table.itemCards, (t) => ({
	ux_itemCards_listingId: uniqueIndex("ux_itemCards_listing_id").on(t.listingId),
}));
export const __deals = sqliteTable("deals", table.deals, (t) => ({
	ix_deals_listingId: index("ix_deals_listing_id").on(t.listingId),
	ix_deals_sellerId: index("ix_deals_seller_id").on(t.sellerId),
	ix_deals_buyerId: index("ix_deals_buyer_id").on(t.buyerId),
}));
export const __payments = sqliteTable("payments", table.payments, (t) => ({
	ux_payments_dealId: uniqueIndex("ux_payments_deal_id").on(t.dealId),
}));
export const __deliveries = sqliteTable("deliveries", table.deliveries);
export const __evaluations = sqliteTable("evaluations", table.evaluations);
export const __chats = sqliteTable("chats", table.chats);
export const __messages = sqliteTable("messages", table.messages, (t) => ({
	ix_messages_chatId_createdAt: index("ix_messages_chat_id_created_at").on(t.chatId, t.createdAt),
}));
export const __transaction = sqliteTable("transaction", table.transaction);

export const Table = {
	users: __users,
	usersAuth: __usersAuth,
	userRestrictions: __userRestrictions,
	listings: __listings,
	itemCards: __itemCards,
	deals: __deals,
	payments: __payments,
	deliveries: __deliveries,
	evaluations: __evaluations,
	chats: __chats,
	messages: __messages,
	transaction: __transaction,
} satisfies BDInterface.TTable;
