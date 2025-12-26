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
	export type RestrictionType = "CHAT" | "SELL" | "BUY" | "WITHDRAW" | "LOGIN";

	/** Evaluation.type */
	export type EvaluationType = "like" | "dislike";

	/* ===================== ENTITIES ===================== */

	export interface User {
		id: string; // id пользователя
		nickname: string; // никнейм
		login: string; // логин (unique)
		createdAt: number; // timestamp (INTEGER)
	}

	export interface UsersAuth {
		id: string; // id записи аутентификации
		userId: string; // FK users.id (unique => 1↔1)
		tokenHash: string; // хеш токена/пароля
	}

	export interface UserRestriction {
		id: string; // id ограничения
		userId: string; // кому выдано (FK users.id)
		type: RestrictionType; // тип ограничения
		untilTs: number; // до какого времени действует
		reason: string; // причина
		byId: string | null; // кто выдал (может быть "U_ADMIN")
		createdAt: number; // когда выдано
	}

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

	export type CreateUser = Omit<User, "id"> & { id?: string };
	export type CreateUsersAuth = Omit<UsersAuth, "id"> & { id?: string };
	export type CreateUserRestriction = Omit<UserRestriction, "id"> & { id?: string };
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

		create: {
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
		};

		read: {
			user: ReadEntity<User>;
			usersAuth: ReadEntity<UsersAuth>;
			userRestriction: ReadEntity<UserRestriction>;
			listing: ReadEntity<Listing>;
			itemCard: ReadEntity<ItemCard>;
			deal: ReadEntity<Deal>;
			payment: ReadEntity<Payment>;
			delivery: ReadEntity<Delivery>;
			evaluation: ReadEntity<Evaluation>;
			chat: ReadEntity<Chat>;
			message: ReadEntity<Message>;

			/* связи */
			listMessagesByChat: (chatId: string) => Message[];
			listDealsByUser: (userId: string) => Deal[];
		};

		update: {
			user: UpdateEntity<User>;
			usersAuth: UpdateEntity<UsersAuth>;
			userRestriction: UpdateEntity<UserRestriction>;
			listing: UpdateEntity<Listing>;
			itemCard: UpdateEntity<ItemCard>;
			deal: UpdateEntity<Deal>;
			payment: UpdateEntity<Payment>;
			delivery: UpdateEntity<Delivery>;
			evaluation: UpdateEntity<Evaluation>;
			chat: UpdateEntity<Chat>;
			message: UpdateEntity<Message>;
		};

		delete: {
			user: DeleteEntity;
			usersAuth: DeleteEntity;
			userRestriction: DeleteEntity;
			listing: DeleteEntity;
			itemCard: DeleteEntity;
			deal: DeleteEntity;
			payment: DeleteEntity;
			delivery: DeleteEntity;
			evaluation: DeleteEntity;
			chat: DeleteEntity;
			message: DeleteEntity;
		};
	}
}
