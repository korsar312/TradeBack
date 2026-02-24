import { z } from "zod";
import type { RestInterface } from "../Rest.interface.ts";

export const createDepositReq: RestInterface.TSchemaMap["CREATE_DEPOSIT"] = z.object({
	amount: z.number().int().min(1),
});
