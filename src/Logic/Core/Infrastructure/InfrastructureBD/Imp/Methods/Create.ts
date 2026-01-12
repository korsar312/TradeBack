import type { BDInterface as Interface } from "../../BD.interface.ts";
import { BDHelpers } from "./BD.Helpers";
import { Table } from "../BD.table";

export class Create extends BDHelpers implements Interface.ICreate {
	User = (d: Interface.User) => (this.db.insert(Table.users).values(d).run(), d.id);
	UsersAuth = (d: Interface.UserAuth) => (this.db.insert(Table.usersAuth).values(d).run(), d.id);
	UserRestriction = (d: Interface.UserRestriction) => (this.db.insert(Table.userRestrictions).values(d).run(), d.id);
	Listing = (d: Interface.Listing) => (this.db.insert(Table.listings).values(d).run(), d.id);
	ItemCard = (d: Interface.ItemCard) => (this.db.insert(Table.itemCards).values(d).run(), d.id);
	Deal = (d: Interface.Deal) => (this.db.insert(Table.deals).values(d).run(), d.id);
	Payment = (d: Interface.Payment) => (this.db.insert(Table.payments).values(d).run(), d.id);
	Delivery = (d: Interface.Delivery) => (this.db.insert(Table.deliveries).values(d).run(), d.id);
	Evaluation = (d: Interface.Evaluation) => (this.db.insert(Table.evaluations).values(d).run(), d.id);
	Chat = (d: Interface.Chat) => (this.db.insert(Table.chats).values(d).run(), d.id);
	Message = (d: Interface.Message) => (this.db.insert(Table.messages).values(d).run(), d.id);
	// last_message_id and last_message_at in chats will update via triggers
}
