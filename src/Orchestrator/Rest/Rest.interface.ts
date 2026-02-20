import { z } from "zod";
import { UseCasesInterface } from "../../Logic/Domain/UseCases/UseCases.interface";
import { UserInterface } from "../../Logic/Domain/Services/ServiceUser/User.interface";

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
		LOGIN: {} as UseCasesInterface.TLoginReq,
		REGISTER: {} as UseCasesInterface.TRegisterReq,
		CREATE_LISTING: {} as UseCasesInterface.TCreateListingReq,
		CREATE_LISTING_ARR: {} as UseCasesInterface.TCreateListingReq[],
		GET_ITEMS: {} as UseCasesInterface.TGetItemListReq,
		GET_ITEM: {} as UseCasesInterface.TGetItemReq,
	} as const satisfies Record<ELinks, unknown>;

	type TInputByLink = {
		[K in keyof typeof inputByLink]: (typeof inputByLink)[K];
	};

	export type TReq<L extends ELinks> = TInputByLink[L];

	/* ===================== RESPONSE MAP ===================== */

	const responseByLink = {
		LOGIN: {} as UseCasesInterface.TLoginRes,
		REGISTER: {} as UseCasesInterface.TRegisterRes,
		CREATE_LISTING: {} as UseCasesInterface.TCreateListingRes,
		CREATE_LISTING_ARR: {} as unknown as void,
		GET_ITEMS: {} as UseCasesInterface.TGetItemListRes,
		GET_ITEM: {} as UseCasesInterface.TGetItemRes,
	} as const satisfies Record<ELinks, unknown>;

	type TResponseByLink = {
		[K in keyof typeof responseByLink]: (typeof responseByLink)[K];
	};

	export type TRes<L extends ELinks> = TResponseByLink[L];

	/* ===================== METHOD RETURN ===================== */

	export type TMethod<L extends ELinks> = (req: TReq<L>, userId: string) => Promise<TRes<L> | void>;
}

const Links = {
	LOGIN: "LOGIN",
	REGISTER: "REGISTER",
	CREATE_LISTING: "CREATE_LISTING",
	CREATE_LISTING_ARR: "CREATE_LISTING_ARR",
	GET_ITEMS: "GET_ITEMS",
	GET_ITEM: "GET_ITEM",
};

const HttpMethod = {
	get: "get",
	post: "post",
	put: "put",
	delete: "delete",
};
