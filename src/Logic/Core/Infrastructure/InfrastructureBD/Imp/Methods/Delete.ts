import { BDHelpers } from "./BD.Helpers";
import type { BDInterface as Interface } from "../../BD.interface.ts";
import { eq } from "drizzle-orm";
import { Table } from "../BD.table";

export class Delete extends BDHelpers implements Interface.IDelete {
	User = (id: string) => {
		const res = this.db.delete(Table.users).where(eq(Table.users.id, id)).run();
		return Number(res.changes ?? 0);
	};
	UsersAuth = (id: string) => {
		const res = this.db.delete(Table.usersAuth).where(eq(Table.usersAuth.id, id)).run();
		return Number(res.changes ?? 0);
	};
	UserRestriction = (id: string) => {
		const res = this.db.delete(Table.userRestrictions).where(eq(Table.userRestrictions.id, id)).run();
		return Number(res.changes ?? 0);
	};
	Listing = (id: string) => {
		const res = this.db.delete(Table.listings).where(eq(Table.listings.id, id)).run();
		return Number(res.changes ?? 0);
	};
	ItemCard = (id: string) => {
		const res = this.db.delete(Table.itemCards).where(eq(Table.itemCards.id, id)).run();
		return Number(res.changes ?? 0);
	};
	Deal = (id: string) => {
		const res = this.db.delete(Table.deals).where(eq(Table.deals.id, id)).run();
		return Number(res.changes ?? 0);
	};
	Payment = (id: string) => {
		const res = this.db.delete(Table.payments).where(eq(Table.payments.id, id)).run();
		return Number(res.changes ?? 0);
	};
	Delivery = (id: string) => {
		const res = this.db.delete(Table.deliveries).where(eq(Table.deliveries.id, id)).run();
		return Number(res.changes ?? 0);
	};
	Evaluation = (id: string) => {
		const res = this.db.delete(Table.evaluations).where(eq(Table.evaluations.id, id)).run();
		return Number(res.changes ?? 0);
	};
	Chat = (id: string) => {
		const res = this.db.delete(Table.chats).where(eq(Table.chats.id, id)).run();
		return Number(res.changes ?? 0);
	};
	Message = (id: string) => {
		const res = this.db.delete(Table.messages).where(eq(Table.messages.id, id)).run();
		return Number(res.changes ?? 0);
	};
}
