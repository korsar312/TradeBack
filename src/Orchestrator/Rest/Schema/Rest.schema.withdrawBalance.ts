import { z } from "zod";
import type { RestInterface } from "../Rest.interface.ts";

export const withdrawBalanceReq: RestInterface.TSchemaMap["WITHDRAW_BALANCE"] = z.object({
	address: z.string().min(1),
	amount: z.number().min(5),
});
