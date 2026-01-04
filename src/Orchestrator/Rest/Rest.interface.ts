import { z } from "zod";

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
		LOGIN: null as unknown as TLoginReq,
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

	export type TLoginReq = {
		login: string;
		token: string;
	};

	/*==================== HTTP RESPONSE ============================*/
}

const Links = {
	LOGIN: "LOGIN",
	GET_GOODS: "GET_GOODS",
	GET_ITEM: "GET_ITEM",
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
