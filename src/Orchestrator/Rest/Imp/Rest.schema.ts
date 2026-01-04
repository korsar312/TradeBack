import { RestInterface } from "../Rest.interface.ts";
import { z, ZodString } from "zod";

type TZod<T> = { [key in keyof T]: ZodString };

export const RestSchema: RestInterface.TSchemaMap = {
	LOGIN: z.object({
		login: z.string().min(1),
		token: z.string().min(1),
	} satisfies TZod<RestInterface.TLoginReq>),
	GET_GOODS: z.object({}),
	GET_ITEM: z.object({}),
	GET_ITEM_DETAIL: z.object({}),
	GET_ORDERS: z.object({}),
	GET_ORDER_DETAIL: z.object({}),
};
