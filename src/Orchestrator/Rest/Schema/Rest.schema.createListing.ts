import { z } from "zod";
import type { RestInterface } from "../Rest.interface.ts";
import { SchemaBank, SchemaPriceKopeks } from "./Rest.schema.public";

const BaseListingSchema = z.object({
	name: z.string().min(1),
	desc: z.string().min(1),
});

const SellsItemCardInfoSchema = z.object({
	name: z.string().min(1),
	age: z.string().min(1),
	bank: SchemaBank,
});

export const createListingReq: RestInterface.TSchemaMap["CREATE_LISTING"] = z.discriminatedUnion("type", [
	BaseListingSchema.extend({
		type: z.literal("CARD"),
		saleKind: z.literal("GOODS"),
		price: SchemaPriceKopeks,
		info: SellsItemCardInfoSchema,
	}),
]);
