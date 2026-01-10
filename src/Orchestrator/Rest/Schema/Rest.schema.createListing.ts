import { z } from "zod";
import { RestInterface } from "../Rest.interface.ts";
import { SchemaBank, SchemaListingType, SchemaPriceKopeks } from "./Rest.schema.public.ts";

const BaseListingSchema = z.object({
	name: z.string().min(1),
	desc: z.string().min(1),
	price: SchemaPriceKopeks,
});

const SellsItemCardInfoSchema = z.object({
	name: z.string().min(1),
	bank: SchemaBank,
});

export const createListingReq: RestInterface.TSchemaMap["CREATE_LISTING"] = z.discriminatedUnion("type", [
	BaseListingSchema.extend({ type: SchemaListingType, info: SellsItemCardInfoSchema }),
]);
