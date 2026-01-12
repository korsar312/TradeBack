import { z } from "zod";
import type { RestInterface } from "../Rest.interface.ts";

export const registerReq: RestInterface.TSchemaMap["REGISTER"] = z.object({
	login: z.string().min(1),
});
