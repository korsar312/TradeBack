import { Request, Response } from "express";
import { TModules } from "../../Logic";

export namespace RestInterface {
	export type IAdapter = {
		[K in ELinks]: TMethod;
	};

	export type TAdapterCtor = new (module: TModules) => IAdapter;
	export type TLinks = Record<ELinks, string>;
	export type TLinksHttp = Record<ELinks, EHttpMethod>;
	export type ELinks = keyof typeof Links;
	export type EHttpMethod = keyof typeof HttpMethod;

	export type TRequest<TBody, TQuery> = Request<any, Partial<TBody>, any, Partial<TQuery>>;
	export type TMethod = (req: TRequest<any, any>, res: Response) => Promise<{ code?: number; returned?: unknown } | void>;

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
