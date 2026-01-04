import type { RestInterface } from "../Rest.interface.ts";
import { z, ZodString } from "zod";

type TZod<T> = { [key in keyof T]: ZodString };

export const RestSchema = {
	login: z.object({
		login: z.string().min(1),
		token: z.string().min(1),
	} satisfies TZod<RestInterface.TLoginReq>),
};
