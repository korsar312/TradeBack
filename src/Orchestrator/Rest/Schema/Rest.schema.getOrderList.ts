import { z } from "zod";
import type { RestInterface } from "../Rest.interface.ts";

export const getOrderListReq: RestInterface.TSchemaMap["GET_ORDER_LIST"] = z.object({
	cursorId: z.string().min(1).optional(),
	limit: z.number().int().max(99).positive(),
	isActive: z.boolean(),
	isSell: z.boolean(),
});
