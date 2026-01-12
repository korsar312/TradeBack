import type { UserInterface } from "../../Services/ServiceUser/User.interface";
import type { ListingInterface } from "../../Services/ServiceListing/Listing.interface.ts";
import type { ItemInterface } from "../../Services/ServiceItem/Item.interface.ts";
import type { DealInterface } from "../../Services/ServiceDeal/Deal.interface.ts";
import type { PaymentInterface } from "../../Services/ServicePayment/Payment.interface.ts";
import type { DeliveryInterface } from "../../Services/ServiceDelivery/Delivery.interface.ts";
import type { EvaluationInterface } from "../../Services/ServiceEvaluation/Evaluation.interface.ts";
import type { ChatInterface } from "../../Services/ServiceChat/Chat.interface.ts";
import type { MessageInterface } from "../../Services/ServiceMessage/Message.interface.ts";
import type { PublicInterface } from "../../Services/Public.interface.ts";

export namespace BDInterface {
	export interface IAdapter {
		create: ICreate;
		read: IRead;
		update: IUpdate;
		delete: IDelete;
	}

	export type TTable = {
		users: Record<keyof User, unknown>;
		usersAuth: Record<keyof UserAuth, unknown>;
		userRestrictions: Record<keyof UserRestriction, unknown>;
		listings: Record<keyof Listing, unknown>;
		itemCards: Record<keyof ItemCard, unknown>;
		deals: Record<keyof Deal, unknown>;
		payments: Record<keyof Payment, unknown>;
		deliveries: Record<keyof Delivery, unknown>;
		evaluations: Record<keyof Evaluation, unknown>;
		chats: Record<keyof Chat, unknown>;
		messages: Record<keyof Message, unknown>;
	};

	export type Listing = ListingInterface.IListing;
	export type ItemCard = ItemInterface.TPickItemInfo<"CARD">;
	export type Deal = DealInterface.IDeal;
	export type Payment = PaymentInterface.IPayment;
	export type Delivery = DeliveryInterface.IDelivery;
	export type Evaluation = EvaluationInterface.IEvaluation;
	export type Chat = ChatInterface.IChat;
	export type Message = MessageInterface.IMessage;
	export type User = UserInterface.IUser;
	export type UserAuth = UserInterface.IUserAuth;
	export type UserRestriction = UserInterface.IUserRestriction;

	/* ===================== CRUD API SHAPES ===================== */

	/** read.entity(id) + read.entity.field(id) */
	export type ReadEntity<T extends { id: string }> = ((id: string) => T | null) & {
		[K in keyof Omit<T, "id">]: (id: string) => T[K] | null;
	};

	/** update.entity(entity) + update.entity.field(id, value) + update.entity.patch(id, patch) */
	export type UpdateEntity<T extends { id: string }> = ((entity: T) => number) & {
		patch: (id: string, patch: Partial<Omit<T, "id">>) => number;
	} & { [K in keyof Omit<T, "id">]: (id: string, value: T[K]) => number };

	export type DeleteEntity = (id: string) => number;
	export type CreateEntity<TCreate> = (data: TCreate) => string;

	/* ===================== ADAPTER (только 5 членов) ===================== */

	export interface ICreate {
		User: CreateEntity<User>;
		UsersAuth: CreateEntity<UserAuth>;
		UserRestriction: CreateEntity<UserRestriction>;
		Listing: CreateEntity<Listing>;
		ItemCard: CreateEntity<ItemCard>;
		Deal: CreateEntity<Deal>;
		Payment: CreateEntity<Payment>;
		Delivery: CreateEntity<Delivery>;
		Evaluation: CreateEntity<Evaluation>;
		Chat: CreateEntity<Chat>;
		Message: CreateEntity<Message>;
	}

	export interface IRead {
		User: ReadEntity<User>;
		UsersAuth: ReadEntity<UserAuth>;
		UserRestriction: ReadEntity<UserRestriction>;
		Listing: ReadEntity<ListingInterface.IListing>;
		ItemCard: ReadEntity<ItemCard>;
		Deal: ReadEntity<Deal>;
		Payment: ReadEntity<Payment>;
		Delivery: ReadEntity<Delivery>;
		Evaluation: ReadEntity<Evaluation>;
		Chat: ReadEntity<Chat>;
		Message: ReadEntity<Message>;

		/* связи */
		ListMessagesByChat: (chatId: string) => Message[];
		ListDealsByUser: (userId: string) => Deal[];
		UsersAuthByLogin: (login: string) => UserAuth | null; // поиск users_auth по users.login
		ItemCardByListingId: (listingId: string) => ItemCard | null; // item_cards.listing_id unique
		ListDealsByListingId: (listingId: string) => Deal[]; // deals.listing_id
		PaymentByDealId: (dealId: string) => Payment | null; // payments.deal_id unique

		/* прочее */
		ListListings: (p: {
			limit: number;
			cursorId?: string;
			status: ListingInterface.EListingStatus;
			saleKind: ListingInterface.EListingSaleKind;
			sort?: PublicInterface.ESort;
			sellerId?: string;
			findStr?: string;
		}) => Listing[];
	}

	export interface IUpdate {
		User: UpdateEntity<User>;
		UsersAuth: UpdateEntity<UserAuth>;
		UserRestriction: UpdateEntity<UserRestriction>;
		Listing: UpdateEntity<ListingInterface.IListing>;
		ItemCard: UpdateEntity<ItemCard>;
		Deal: UpdateEntity<Deal>;
		Payment: UpdateEntity<Payment>;
		Delivery: UpdateEntity<Delivery>;
		Evaluation: UpdateEntity<Evaluation>;
		Chat: UpdateEntity<Chat>;
		Message: UpdateEntity<Message>;
	}

	export interface IDelete {
		User: DeleteEntity;
		UsersAuth: DeleteEntity;
		UserRestriction: DeleteEntity;
		Listing: DeleteEntity;
		ItemCard: DeleteEntity;
		Deal: DeleteEntity;
		Payment: DeleteEntity;
		Delivery: DeleteEntity;
		Evaluation: DeleteEntity;
		Chat: DeleteEntity;
		Message: DeleteEntity;
	}
}
