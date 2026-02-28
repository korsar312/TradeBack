import { z } from "zod";
import type { RestInterface } from "../Rest.interface.ts";

export const startBuyItemReq: RestInterface.TSchemaMap["START_BUY_ITEM"] = z.object({
	listingId: z.string().min(1),
});
