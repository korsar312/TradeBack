import { z } from "zod";
import { RestInterface } from "../Rest.interface.ts";
import { SchemaBank, SchemaPriceKopeks, SchemaSort } from "./Rest.schema.ts";

const GetItemsCoreSchema = z.object({
	limit: z.number().int().positive(),
	cursorId: z.string().min(1).optional(),
	sort: SchemaSort.optional(),
	sellerId: z.string().min(1).optional(),
	price: SchemaPriceKopeks.optional(),
	findStr: z.string().min(1).optional(),
});

export const getItemsReq: RestInterface.TSchemaMap["GET_ITEMS"] = z.discriminatedUnion("type", [
	GetItemsCoreSchema.extend({
		type: z.literal("CARD"),
		bank: SchemaBank,
	}),
]);
