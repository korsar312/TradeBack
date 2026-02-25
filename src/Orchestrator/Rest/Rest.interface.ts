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

	/* ===================== REQUEST/RESPONSE MAP ===================== */

	const dtoByLink = {
		LOGIN: {
			request: {} as UseCasesInterface.TLoginReq,
			response: {} as UseCasesInterface.TLoginRes,
		},
		REGISTER: {
			request: {} as UseCasesInterface.TRegisterReq,
			response: {} as UseCasesInterface.TRegisterRes,
		},
		CREATE_LISTING: {
			request: {} as UseCasesInterface.TCreateListingReq,
			response: {} as UseCasesInterface.TCreateListingRes,
		},
		CREATE_LISTING_ARR: {
			request: {} as UseCasesInterface.TCreateListingReq[],
			response: {} as unknown as void,
		},
		GET_ITEMS: {
			request: {} as UseCasesInterface.TGetItemListReq,
			response: {} as UseCasesInterface.TGetItemListRes,
		},
		GET_ITEM: {
			request: {} as UseCasesInterface.TGetItemReq,
			response: {} as UseCasesInterface.TGetItemRes,
		},
		AWAIT_PAY_DEPOSIT: {
			request: {} as unknown as UseCasesInterface.TAwaitPayDepositReq,
			response: {} as UseCasesInterface.TAwaitPayDepositRes,
		},
		IS_EXIST_DEPOSIT: {
			request: {} as unknown as UseCasesInterface.TCheckExistDepositReq,
			response: {} as UseCasesInterface.TCheckExistDepositRes,
		},
		CREATE_DEPOSIT: {
			request: {} as UseCasesInterface.TCreateDepositReq,
			response: {} as UseCasesInterface.TCreateDepositRes,
		},
		REMOVE_DEPOSIT: {
			request: {} as unknown as UseCasesInterface.TRemoveDepositReq,
			response: {} as UseCasesInterface.TRemoveDepositRes,
		},
		GET_BALANCE: {
			request: {} as unknown as UseCasesInterface.TGetBalanceReq,
			response: {} as UseCasesInterface.TGetBalanceRes,
		},
	} as const satisfies Record<ELinks, TDtoStruct>;

	type TDtoStruct = {
		request: unknown;
		response: unknown;
	};

	type TDtoByLink = {
		[K in keyof typeof dtoByLink]: (typeof dtoByLink)[K];
	};

	export type TReq<L extends ELinks> = TDtoByLink[L]["request"];
	export type TRes<L extends ELinks> = TDtoByLink[L]["response"];

	/* ===================== METHOD RETURN ===================== */

	export type TMethod<L extends ELinks> = (req: TReq<L>, userId: string) => TRes<L> | void;
}

const Links = {
	LOGIN: "LOGIN",
	REGISTER: "REGISTER",
	CREATE_LISTING: "CREATE_LISTING",
	CREATE_LISTING_ARR: "CREATE_LISTING_ARR",
	GET_ITEMS: "GET_ITEMS",
	GET_ITEM: "GET_ITEM",
	AWAIT_PAY_DEPOSIT: "AWAIT_PAY_DEPOSIT",
	IS_EXIST_DEPOSIT: "IS_EXIST_DEPOSIT",
	CREATE_DEPOSIT: "CREATE_DEPOSIT",
	REMOVE_DEPOSIT: "REMOVE_DEPOSIT",
	GET_BALANCE: "GET_BALANCE",
};

const HttpMethod = {
	get: "get",
	post: "post",
	put: "put",
	delete: "delete",
};
