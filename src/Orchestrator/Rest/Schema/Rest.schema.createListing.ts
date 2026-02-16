import { z } from "zod";
import type { RestInterface } from "../Rest.interface.ts";
import { SchemaBank, SchemaListingType, SchemaPriceKopeks } from "./Rest.schema.public";

const BaseListingSchema = z.object({
	name: z.string().min(1),
	desc: z.string().min(1),
	saleKind: SchemaListingType,
	price: SchemaPriceKopeks,
});

const CardType = z.object({
	name: z.string().min(1),
	age: z.string().min(1),
	bank: SchemaBank,
});

const FreeType = z.object({
	desc: z.string().min(1),
});

export const createListingReq: RestInterface.TSchemaMap["CREATE_LISTING"] = z.discriminatedUnion("type", [
	BaseListingSchema.extend({ type: z.literal("CARD"), info: CardType }),
	BaseListingSchema.extend({ type: z.literal("FREE"), info: FreeType }),
]);
