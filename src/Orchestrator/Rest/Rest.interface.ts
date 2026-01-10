import { z } from "zod";
import { PublicInterface } from "../../Logic/Core/Services/Public.interface.ts";
import { UserInterface } from "../../Logic/Core/Services/ServiceUser/User.interface.ts";

export namespace RestInterface {
	export type IAdapter = {
		[K in ELinks]: TMethod<K>;
	};

	export type TSchemaMap = {
		[K in ELinks]: z.ZodType<TReq<K>>;
	};

	type TLinksParam = {
		http: EHttpMethod;
		link: string;
		role: UserInterface.ERole[];
	};

	export type TLinks = Record<ELinks, TLinksParam>;
	export type ELinks = keyof typeof Links;
	export type TRouteRole = Record<UserInterface.ERole, string[]>;
	export type EHttpMethod = keyof typeof HttpMethod;

	export type TReturn = { code?: number; returned?: unknown };
	export type TReq<L extends ELinks> = TInputByLink[L];
	export type TMethod<L extends ELinks> = (req: TReq<L>, userId: string) => Promise<TReturn | void>;

	const inputByLink = {
		LOGIN: {} as ILoginReq,
		REGISTER: {} as IRegisterReq,
		CREATE_LISTING: {} as TCreateListingReq,
		GET_ITEMS: {} as TGetItemsReq,
		GET_ITEM_DETAIL: {} as {},
		GET_ORDERS: {} as {},
		GET_ORDER_DETAIL: {} as {},
	} as const satisfies Record<ELinks, unknown>;

	type TInputByLink = {
		[K in keyof typeof inputByLink]: (typeof inputByLink)[K];
	};

	/*==================== LOGIN REQ ============================*/
	export interface ILoginReq {
		login: string;
		token: string;
	}

	/*==================== REGISTER REQ ============================*/
	export interface IRegisterReq {
		login: string;
	}

	/*==================== CREATE LOT REQ ============================*/
	interface ICreateListing {
		name: string;
		desc: string;
		price: number;
		type: PublicInterface.ETypeItem;
		info: unknown;
	}

	interface ICreateListingCardInfo {
		name: string;
		bank: PublicInterface.EBank;
	}

	interface ICreateListingCard extends ICreateListing {
		type: "CARD";
		info: ICreateListingCardInfo;
	}

	export type TCreateListingReq = ICreateListingCard;

	/*==================== GET LOT REQ ============================*/
	type TGetItemsCore = {
		limit: number; // сколько отдавать
		cursorId?: string; // id лота с которого начинать отсчет limit
		sort?: PublicInterface.ESort; // сортировка
		sellerId?: string; // фильтр по продавцу
		priceUp?: number; // фильтр по верхней цене
		priceDown?: number; // фильтр по нижней цене
		findStr?: string; // фильтр по имени
	};

	type TGetItemsType<T extends PublicInterface.ETypeItem, B> = { type: T } & B;

	type TGetItemsItemCard = TGetItemsType<"CARD", TGetItemsItemFilterCard>;
	type TGetItemsItemFilterCard = {
		bank?: PublicInterface.EBank; // фильтр по банку
	};

	type TGetItemsItem = TGetItemsItemCard;
	export type TGetItemsReq = TGetItemsCore & TGetItemsItem;

	/*==================== HTTP RESPONSE ============================*/
}

const Links = {
	LOGIN: "LOGIN",
	REGISTER: "REGISTER",
	CREATE_LISTING: "CREATE_LISTING",
	GET_ITEMS: "GET_ITEMS",
	GET_ITEM_DETAIL: "GET_ITEM_DETAIL",
	GET_ORDERS: "GET_ORDERS",
	GET_ORDER_DETAIL: "GET_ORDER_DETAIL",
};

const HttpMethod = {
	get: "get",
	post: "post",
	put: "put",
	delete: "delete",
};
