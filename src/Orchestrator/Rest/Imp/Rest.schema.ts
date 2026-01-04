import { RestInterface } from "../Rest.interface.ts";
import { z } from "zod";

export const RestSchema: RestInterface.TSchemaMap = {
	LOGIN: z.object({
		login: z.string().min(1),
		token: z.string().min(1),
	}),

	GET_GOODS: z.object({}),

	GET_ITEM: z.object({}),

	GET_ITEM_DETAIL: z.object({}),

	GET_ORDERS: z.object({}),

	GET_ORDER_DETAIL: z.object({}),
} as const;
