import { z } from "zod";
import type { PublicInterface } from "../../Logic/Core/Services/Public.interface.ts";
import type { UserInterface } from "../../Logic/Core/Services/ServiceUser/User.interface.ts";
import type { ItemInterface } from "../../Logic/Core/Services/ServiceItem/Item.interface.ts";
import { ListingInterface } from "../../Logic/Core/Services/ServiceListing/Listing.interface";

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

	/* ===================== REQUEST MAP ===================== */

	const inputByLink = {
		LOGIN: {} as ILoginReq,
		REGISTER: {} as IRegisterReq,
		CREATE_LISTING: {} as ICreateListingReq,
		CREATE_LISTING_ARR: {} as ICreateListingReq[],
		GET_ITEMS: {} as IGetItemsReq,
		GET_ITEM_DETAIL: {} as {},
		GET_ORDERS: {} as {},
		GET_ORDER_DETAIL: {} as {},
	} as const satisfies Record<ELinks, unknown>;

	type TInputByLink = {
		[K in keyof typeof inputByLink]: (typeof inputByLink)[K];
	};

	export type TReq<L extends ELinks> = TInputByLink[L];

	/* ===================== RESPONSE MAP ===================== */

	const responseByLink = {
		LOGIN: null as unknown as string,
		REGISTER: null as unknown as UserInterface.IUserAll,
		CREATE_LISTING: null as unknown as void,
		CREATE_LISTING_ARR: null as unknown as void,
		GET_ITEMS: null as unknown as IGetItemsRes[],
		GET_ITEM_DETAIL: null as unknown as void,
		GET_ORDERS: null as unknown as void,
		GET_ORDER_DETAIL: null as unknown as void,
	} as const satisfies Record<ELinks, unknown>;

	type TResponseByLink = {
		[K in keyof typeof responseByLink]: (typeof responseByLink)[K];
	};

	export type TRes<L extends ELinks> = TResponseByLink[L];

	/* ===================== METHOD RETURN ===================== */

	export type TReturn<L extends ELinks> = { code?: number; returned?: TRes<L> };
	export type TMethod<L extends ELinks> = (req: TReq<L>, userId: string) => Promise<TReturn<L> | void>;

	/*========================== HTTP REQUEST ==================================*/

	/*==== LOGIN REQ ====*/

	export interface ILoginReq {
		login: string;
		token: string;
	}

	/*==== REGISTER REQ ====*/

	export interface IRegisterReq {
		login: string;
	}

	/*==== CREATE LISTING REQ ====*/

	export type ICreateListingReq = {
		name: string;
		desc: string;
		price: number;
		saleKind: ListingInterface.EListingSaleKind;
	} & ItemInterface.TItemReq;

	/*==== GET ITEMS REQ ====*/

	export type IGetItemsReq = {
		limit: number;
		saleKind: ListingInterface.EListingSaleKind;
		cursorId?: string;
		sort?: PublicInterface.ESort;
		sellerId?: string;
		priceUp?: number;
		priceDown?: number;
		findStr?: string;
	} & ItemInterface.TItemReqPub;

	/*========================== HTTP RESPONSE ==================================*/

	/*==== GET ITEMS LISTING RES ====*/

	export type IGetItemsRes = {
		name: string;
		price: number;

		sellerName: string;
		sellerId: string;
		sellerLike: number;
		sellerDislike: number;
	} & ItemInterface.TItemResPub;
}

const Links = {
	LOGIN: "LOGIN",
	REGISTER: "REGISTER",
	CREATE_LISTING: "CREATE_LISTING",
	CREATE_LISTING_ARR: "CREATE_LISTING_ARR",
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
