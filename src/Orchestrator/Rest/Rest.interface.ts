import { Request, Response } from "express";
import { TModules } from "../../Logic";

export namespace RestInterface {
	export type IAdapter = {
		[K in ELinks]: TMethod;
	};

	export type IChecker = {};

	export type TAdapterCtor = new (module: TModules) => IAdapter;
	export type TLinks = Record<ELinks, string>;
	export type TLinksHttp = Record<ELinks, EHttpMethod>;
	export type ELinks = keyof typeof Links;
	export type EHttpMethod = keyof typeof HttpMethod;

	export type TMethod = (req: Request, res: Response) => Promise<unknown>;
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
