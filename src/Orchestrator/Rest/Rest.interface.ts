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
		LOGIN: null as unknown as ILoginReq,
		CREATE_LISTING: null as unknown as TSellsItemReq,
		GET_ITEMS: null as unknown as {},
		GET_ITEM_DETAIL: null as unknown as {},
		GET_ORDERS: null as unknown as {},
		GET_ORDER_DETAIL: null as unknown as {},
	} as const satisfies Record<ELinks, unknown>;

	type TInputByLink = {
		[K in keyof typeof inputByLink]: (typeof inputByLink)[K];
	};

	/*==================== HTTP REQUEST ============================*/

	export interface ILoginReq {
		login: string;
		token: string;
	}

	interface ISellsItem {
		name: string;
		desc: string;
		price: number;
		type: PublicInterface.ETypeItem;
		info: unknown;
	}

	interface ISellsItemCardInfo {
		name: string;
		bank: PublicInterface.EBank;
	}

	interface ISellsItemCard extends ISellsItem {
		type: "CARD";
		info: ISellsItemCardInfo;
	}

	export type TSellsItemReq = ISellsItemCard;

	type TGetItems = {
		limit: number; // сколько отдавать
		cursorId?: string; // id лота с которого начинать отсчет
		sort?: PublicInterface.ESort; // сортировка
		sellerId?: string; // фильтр по продавцу
		price?: number; // фильтр по цене
	} & TItem;

	interface IItem {
		type: PublicInterface.ETypeItem; // фильтр по типу товара
	}

	interface IItemCard extends IItem {
		type: "CARD";
		bank: PublicInterface.EBank;
	}

	type TItem = IItemCard;

	const asdf: TGetItems = {
		limit: 11,
		cursorId: "jh",
		sort: "TO_UPPER",
		type: "CARD",
		bank: "SBER",
	};

	/*==================== HTTP RESPONSE ============================*/
}

const Links = {
	LOGIN: "LOGIN",
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
