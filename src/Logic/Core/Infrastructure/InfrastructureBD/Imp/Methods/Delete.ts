import { BDHelpers } from "./BD.Helpers.ts";
import type { BDInterface as Interface } from "../../BD.interface.ts";

export class Delete extends BDHelpers implements Interface.IDelete {
	User = (id: string) => this.run(`DELETE FROM users WHERE id = ?`, [id]);
	UsersAuth = (id: string) => this.run(`DELETE FROM users_auth WHERE id = ?`, [id]);
	UserRestriction = (id: string) => this.run(`DELETE FROM user_restrictions WHERE id = ?`, [id]);
	Listing = (id: string) => this.run(`DELETE FROM listings WHERE id = ?`, [id]);
	ItemCard = (id: string) => this.run(`DELETE FROM item_cards WHERE id = ?`, [id]);
	Deal = (id: string) => this.run(`DELETE FROM deals WHERE id = ?`, [id]);
	Payment = (id: string) => this.run(`DELETE FROM payments WHERE id = ?`, [id]);
	Delivery = (id: string) => this.run(`DELETE FROM deliveries WHERE id = ?`, [id]);
	Evaluation = (id: string) => this.run(`DELETE FROM evaluations WHERE id = ?`, [id]);
	Chat = (id: string) => this.run(`DELETE FROM chats WHERE id = ?`, [id]);
	Message = (id: string) => this.run(`DELETE FROM messages WHERE id = ?`, [id]);
}
