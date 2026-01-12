import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import type { BDInterface } from "../BD.interface.ts";

const table = {
	users: {
		id: text("id").primaryKey(),
		nickname: text("nickname").notNull(),
		role: text("role").$type<BDInterface.User["role"]>().notNull(),
		login: text("login").notNull(),
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
		createdAt: integer("created_at").notNull(),
		status: text("status").$type<BDInterface.Listing["status"]>().notNull(),
		name: text("name").notNull(),
		desc: text("description").notNull(),
		price: integer("price").notNull(),
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
		buyerId: text("buyer_id"),
		status: text("status").$type<BDInterface.Deal["status"]>().notNull(),
	},
	payments: {
		id: text("id").primaryKey(),
		dealId: text("deal_id").notNull(),
		status: text("status").$type<BDInterface.Payment["status"]>().notNull(),
		price: integer("price").notNull(),
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
} satisfies BDInterface.TTable;

export const __users = sqliteTable("users", table.users);
export const __usersAuth = sqliteTable("usersAuth", table.usersAuth);
export const __userRestrictions = sqliteTable("userRestrictions", table.userRestrictions);
export const __listings = sqliteTable("listings", table.listings);
export const __itemCards = sqliteTable("itemCards", table.itemCards);
export const __deals = sqliteTable("deals", table.deals);
export const __payments = sqliteTable("payments", table.payments);
export const __deliveries = sqliteTable("deliveries", table.deliveries);
export const __evaluations = sqliteTable("evaluations", table.evaluations);
export const __chats = sqliteTable("chats", table.chats);
export const __messages = sqliteTable("messages", table.messages);

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
} satisfies BDInterface.TTable;
