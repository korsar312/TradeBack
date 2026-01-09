import { z } from "zod";
import { RestInterface } from "../Rest.interface.ts";

export const loginReq: RestInterface.TSchemaMap["LOGIN"] = z.object({
	login: z.string().min(1),
	token: z.string().min(1),
});
