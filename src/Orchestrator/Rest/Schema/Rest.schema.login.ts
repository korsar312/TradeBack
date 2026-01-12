import { z } from "zod";
import type { RestInterface } from "../Rest.interface.ts";

export const loginReq: RestInterface.TSchemaMap["LOGIN"] = z.object({
	login: z.string().min(1),
	token: z.string().min(1),
});
