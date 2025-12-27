import { UserInterface } from "../../Services/ServiceUser/User.interface";

export namespace BDInterface {
	/* ===================== ENUM TYPES ===================== */

	/** Deal.status */
	export type DealStatus = "PENDING_PAYMENT" | "IN_ESCROW" | "FULFILLED" | "COMPLETE" | "CANCELLED" | "DISPUTED";

	/** Payment.status */
	export type PaymentStatus = "INIT" | "AUTHORIZED" | "IN_ESCROW" | "RELEASED" | "REFUNDED" | "FAILED";

	/** Delivery.status */
	export type DeliveryStatus = "PENDING" | "IN_TRANSIT" | "COMPLETE";

	/** Listing.status */
	export type ListingStatus = "DRAFT" | "ACTIVE" | "RESERVED" | "SOLD" | "ARCHIVED";

	/** Listing.type */
	export type ListingType = "CARD";

	/** Restriction.type */

	/** Evaluation.type */
	export type EvaluationType = "like" | "dislike";

	/* ===================== ENTITIES ===================== */

	export interface Listing {
		id: string; // id объявления
		sellerId: string; // FK users.id
		type: ListingType; // тип объявления
		createdAt: number; // время создания
		status: ListingStatus; // статус
		name: string; // заголовок
		desc: string; // описание
	}

	export interface ItemCard {
		id: string; // id записи деталей товара
		listingId: string; // FK listings.id (unique => 1↔1)
		bank: string; // банк
		name: string; // имя на карте
	}

	export interface Deal {
		id: string; // id сделки
		listingId: string; // FK listings.id (unique)
		sellerId: string; // FK users.id
		buyerId: string; // FK users.id
		status: DealStatus; // статус
	}

	export interface Payment {
		id: string; // id платежа
		dealId: string; // FK deals.id (unique => 1↔1)
		status: PaymentStatus; // статус платежа
		price: number; // сумма (INTEGER)
	}

	export interface Delivery {
		id: string; // id доставки
		dealId: string; // FK deals.id (unique => 1↔1)
		status: DeliveryStatus; // статус
		trackNumber: number | null; // трек (NULL если нет)
		departurePlace: string; // место отправления
		deliveryPlace: string | null; // место поступления (NULL если нет)
	}

	export interface Evaluation {
		id: string; // id отзыва
		dealId: string; // FK deals.id (unique => 1↔1)
		type: EvaluationType; // like/dislike
		comment: string; // комментарий
		createdAt: number; // время создания
	}

	export interface Chat {
		id: string; // id чата
		dealId: string; // FK deals.id (unique => 1↔1)
		buyerSeeTime: number; // просмотр покупателя
		sellerSeeTime: number; // просмотр продавца
		lastMessageId: string | null; // денормализация
		lastMessageAt: number | null; // денормализация
	}

	export interface Message {
		id: string; // id сообщения
		chatId: string; // FK chats.id
		userId: string; // FK users.id
		createdAt: number; // время сообщения
		text: string; // текст
	}

	/* ===================== CREATE INPUTS (id optional) ===================== */

	export type CreateUser = Omit<UserInterface.IUser, "id"> & { id?: string };
	export type CreateUsersAuth = Omit<UserInterface.IUsersAuth, "id"> & { id?: string };
	export type CreateUserRestriction = Omit<UserInterface.IUserRestriction, "id"> & { id?: string };
	export type CreateListing = Omit<Listing, "id"> & { id?: string };
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
		user: CreateEntity<CreateUser>;
		usersAuth: CreateEntity<CreateUsersAuth>;
		userRestriction: CreateEntity<CreateUserRestriction>;
		listing: CreateEntity<CreateListing>;
		itemCard: CreateEntity<CreateItemCard>;
		deal: CreateEntity<CreateDeal>;
		payment: CreateEntity<CreatePayment>;
		delivery: CreateEntity<CreateDelivery>;
		evaluation: CreateEntity<CreateEvaluation>;
		chat: CreateEntity<CreateChat>;
		message: CreateEntity<CreateMessage>;
	}

	export interface IRead {
		User: ReadEntity<UserInterface.IUser>;
		UsersAuth: ReadEntity<UserInterface.IUsersAuth>;
		UserRestriction: ReadEntity<UserInterface.IUserRestriction>;
		Listing: ReadEntity<Listing>;
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
		UsersAuthByLogin: (login: string) => UserInterface.IUsersAuth | null; // поиск users_auth по users.login
	}

	export interface IUpdate {
		User: UpdateEntity<UserInterface.IUser>;
		UsersAuth: UpdateEntity<UserInterface.IUsersAuth>;
		UserRestriction: UpdateEntity<UserInterface.IUserRestriction>;
		Listing: UpdateEntity<Listing>;
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
