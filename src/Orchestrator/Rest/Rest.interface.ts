import { z } from "zod";
import { BDInterface } from "../../Logic/Core/Infrastructure/InfrastructureBD/BD.interface.ts";
import { PublicInterface } from "../../Logic/Core/Services/Public.interface.ts";

export namespace RestInterface {
	export type IAdapter = {
		[K in ELinks]: TMethod<K>;
	};

	export type TSchemaMap = {
		[K in ELinks]: z.ZodType<TReq<K>>;
	};

	export type TLinks = Record<ELinks, string>;
	export type TLinksHttp = Record<ELinks, EHttpMethod>;
	export type ELinks = keyof typeof Links;
	export type EHttpMethod = keyof typeof HttpMethod;

	export type TReturn = { code?: number; returned?: unknown };
	export type TReq<L extends ELinks> = TInputByLink[L];
	export type TMethod<L extends ELinks> = (req: TReq<L>) => Promise<TReturn | void>;

	const inputByLink = {
		LOGIN: null as unknown as ILoginReq,
		CREATE_LISTING: null as unknown as TSellsItemReq,
		GET_GOODS: null as unknown as {},
		GET_ITEM: null as unknown as {},
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
		type: BDInterface.ListingType;
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

	/*==================== HTTP RESPONSE ============================*/
}

const Links = {
	LOGIN: "LOGIN",
	GET_GOODS: "GET_GOODS",
	GET_ITEM: "GET_ITEM",
	CREATE_LISTING: "CREATE_LISTING",
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
