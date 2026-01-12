import { BDHelpers } from "./BD.Helpers";
import type { BDInterface as Interface } from "../../BD.interface.ts";
import { Table } from "../BD.table";

export class Update extends BDHelpers implements Interface.IUpdate {
	User = this.mkUpdateEntity<Interface.User>(Table.users, (u) => u);
	UsersAuth = this.mkUpdateEntity<Interface.UserAuth>(Table.usersAuth, (a) => ({ userId: a.userId, tokenHash: a.tokenHash }));
	UserRestriction = this.mkUpdateEntity<Interface.UserRestriction>(Table.userRestrictions, (r) => r);
	Listing = this.mkUpdateEntity<Interface.Listing>(Table.listings, (l) => l);
	ItemCard = this.mkUpdateEntity<Interface.ItemCard>(Table.itemCards, (c) => c);
	Deal = this.mkUpdateEntity<Interface.Deal>(Table.deals, (d) => d);
	Payment = this.mkUpdateEntity<Interface.Payment>(Table.payments, (p) => p);
	Delivery = this.mkUpdateEntity<Interface.Delivery>(Table.deliveries, (d) => d);
	Evaluation = this.mkUpdateEntity<Interface.Evaluation>(Table.evaluations, (e) => e);
	Chat = this.mkUpdateEntity<Interface.Chat>(Table.chats, (c) => c);
	Message = this.mkUpdateEntity<Interface.Message>(Table.messages, (m) => m);
}
