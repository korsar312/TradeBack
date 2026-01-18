import { z } from "zod";
import type { RestInterface } from "../Rest.interface.ts";
import { SchemaItemType } from "./Rest.schema.public";

export const getItemReq: RestInterface.TSchemaMap["GET_ITEM"] = z.object({
	id: z.string().min(1),
	type: SchemaItemType,
});
