import { UserInterface } from "../../Services/ServiceUser/User.interface";
import { ListingInterface } from "../../Services/ServiceListing/Listing.interface.ts";
import { ItemInterface } from "../../Services/ServiceItem/Item.interface.ts";
import { DealInterface } from "../../Services/ServiceDeal/Deal.interface.ts";
import { PaymentInterface } from "../../Services/ServicePayment/Payment.interface.ts";
import { DeliveryInterface } from "../../Services/ServiceDelivery/Delivery.interface.ts";
import { EvaluationInterface } from "../../Services/ServiceEvaluation/Evaluation.interface.ts";
import { ChatInterface } from "../../Services/ServiceChat/Chat.interface.ts";
import { MessageInterface } from "../../Services/ServiceMessage/Message.interface.ts";

export namespace BDInterface {
	export type Listing = ListingInterface.IListing;

	export type ItemCard = ItemInterface.TItemCard;
	export type Deal = DealInterface.IDeal;
	export type Payment = PaymentInterface.IPayment;
	export type Delivery = DeliveryInterface.IDelivery;
	export type Evaluation = EvaluationInterface.IEvaluation;
	export type Chat = ChatInterface.IChat;
	export type Message = MessageInterface.IMessage;
	export type User = UserInterface.IUser;
	export type UserAuth = UserInterface.IUserAuth;
	export type UserRestriction = UserInterface.IUserRestriction;

	/* ===================== CREATE INPUTS (id optional) ===================== */

	export type CreateUser = Omit<User, "id"> & { id?: string };
	export type CreateUsersAuth = Omit<UserAuth, "id"> & { id?: string };
	export type CreateUserRestriction = Omit<UserRestriction, "id"> & { id?: string };
	export type CreateListing = Omit<ListingInterface.IListing, "id"> & { id?: string };
	export type CreateItemCard = Omit<ItemCard, "id"> & { id?: string };
	export type CreateDeal = Omit<Deal, "id"> & { id?: string };
	export type CreatePayment = Omit<Payment, "id"> & { id?: string };
	export type CreateDelivery = Omit<Delivery, "id"> & { id?: string };
	export type CreateEvaluation = Omit<Evaluation, "id"> & { id?: string };
	export type CreateChat = Omit<Chat, "id" | "lastMessageId" | "lastMessageAt"> & { id?: string };
	export type CreateMessage = Omit<Message, "id"> & { id?: string };

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

	export interface IAdapter {
		initSchema(): void;

		create: ICreate;
		read: IRead;
		update: IUpdate;
		delete: IDelete;
	}

	export interface ICreate {
		User: CreateEntity<CreateUser>;
		UsersAuth: CreateEntity<CreateUsersAuth>;
		UserRestriction: CreateEntity<CreateUserRestriction>;
		Listing: CreateEntity<CreateListing>;
		ItemCard: CreateEntity<CreateItemCard>;
		Deal: CreateEntity<CreateDeal>;
		Payment: CreateEntity<CreatePayment>;
		Delivery: CreateEntity<CreateDelivery>;
		Evaluation: CreateEntity<CreateEvaluation>;
		Chat: CreateEntity<CreateChat>;
		Message: CreateEntity<CreateMessage>;
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
