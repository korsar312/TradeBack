import { BDHelpers } from "./BD.Helpers.ts";
import type { BDInterface as Interface } from "../../BD.interface.ts";
import { asc, eq, or } from "drizzle-orm";
import { Table } from "../BD.table.ts";

export class Read extends BDHelpers implements Interface.IRead {
	User = this.mkReadEntity<Interface.User>(Table.users, (id) => {
		const r = this.db.select().from(Table.users).where(eq(Table.users.id, id)).get();
		return r ? (r as Interface.User) : null;
	});

	UsersAuth = this.mkReadEntity<Interface.UserAuth>(Table.usersAuth, (id) => {
		const r = this.db.select().from(Table.usersAuth).where(eq(Table.usersAuth.id, id)).get();
		return r ? (r as Interface.UserAuth) : null;
	});

	UserRestriction = this.mkReadEntity<Interface.UserRestriction>(Table.userRestrictions, (id) => {
		const r = this.db.select().from(Table.userRestrictions).where(eq(Table.userRestrictions.id, id)).get();
		return r ? (r as Interface.UserRestriction) : null;
	});

	Listing = this.mkReadEntity<Interface.Listing>(Table.listings, (id) => {
		const r = this.db.select().from(Table.listings).where(eq(Table.listings.id, id)).get();
		return r ? (r as Interface.Listing) : null;
	});

	ItemCard = this.mkReadEntity<Interface.ItemCard>(Table.itemCards, (id) => {
		const r = this.db.select().from(Table.itemCards).where(eq(Table.itemCards.id, id)).get();
		return r ? (r as Interface.ItemCard) : null;
	});

	Deal = this.mkReadEntity<Interface.Deal>(Table.deals, (id) => {
		const r = this.db.select().from(Table.deals).where(eq(Table.deals.id, id)).get();
		return r ? (r as Interface.Deal) : null;
	});

	Payment = this.mkReadEntity<Interface.Payment>(Table.payments, (id) => {
		const r = this.db.select().from(Table.payments).where(eq(Table.payments.id, id)).get();
		return r ? (r as Interface.Payment) : null;
	});

	Delivery = this.mkReadEntity<Interface.Delivery>(Table.deliveries, (id) => {
		const r = this.db.select().from(Table.deliveries).where(eq(Table.deliveries.id, id)).get();
		return r ? (r as Interface.Delivery) : null;
	});

	Evaluation = this.mkReadEntity<Interface.Evaluation>(Table.evaluations, (id) => {
		const r = this.db.select().from(Table.evaluations).where(eq(Table.evaluations.id, id)).get();
		return r ? (r as Interface.Evaluation) : null;
	});

	Chat = this.mkReadEntity<Interface.Chat>(Table.chats, (id) => {
		const r = this.db.select().from(Table.chats).where(eq(Table.chats.id, id)).get();
		return r ? (r as Interface.Chat) : null;
	});

	Message = this.mkReadEntity<Interface.Message>(Table.messages, (id) => {
		const r = this.db.select().from(Table.messages).where(eq(Table.messages.id, id)).get();
		return r ? (r as Interface.Message) : null;
	});

	ListMessagesByChat = (chatId: string) => {
		const rows = this.db
			.select()
			.from(Table.messages)
			.where(eq(Table.messages.chatId, chatId))
			.orderBy(asc(Table.messages.createdAt))
			.all();
		return rows as Interface.Message[];
	};

	ListDealsByUser = (userId: string) => {
		const rows = this.db
			.select()
			.from(Table.deals)
			.where(or(eq(Table.deals.sellerId, userId), eq(Table.deals.buyerId, userId)))
			.orderBy(asc(Table.deals.id))
			.all();
		return rows as Interface.Deal[];
	};

	UsersAuthByLogin = (login: string) => {
		const r = this.db
			.select({
				id: Table.usersAuth.id,
				userId: Table.usersAuth.userId,
				tokenHash: Table.usersAuth.tokenHash,
			})
			.from(Table.usersAuth)
			.innerJoin(Table.users, eq(Table.users.id, Table.usersAuth.userId))
			.where(eq(Table.users.login, login))
			.get();
		return r ? (r as Interface.UserAuth) : null;
	};
}
