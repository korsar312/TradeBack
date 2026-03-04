import { z } from "zod";
import type { RestInterface } from "../Rest.interface.ts";

export const getOrderReq: RestInterface.TSchemaMap["GET_ORDER"] = z.object({
	dealId: z.string().min(1),
});
