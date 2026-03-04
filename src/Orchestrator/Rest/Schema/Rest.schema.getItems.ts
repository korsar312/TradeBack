import { z } from "zod";
import type { RestInterface } from "../Rest.interface.ts";
import { SchemaBank, SchemaListingType, SchemaPriceKopeks, SchemaSort } from "./Rest.schema.public";

const BaseItemsSchema = z.object({
	limit: z.number().int().max(99).positive(),
	cursorId: z.string().min(1).optional(),
	sellerId: z.string().min(1).optional(),
	findStr: z.string().min(1).optional(),
	sort: SchemaSort.optional(),
	priceUp: SchemaPriceKopeks.optional(),
	priceDown: SchemaPriceKopeks.optional(),
	saleKind: SchemaListingType,
});

const CardType = z.object({
	bank: SchemaBank.array().min(1).optional(),
	age: z.string().min(1).optional(),
});

const FreeType = z.object({});

export const getItemsReq: RestInterface.TSchemaMap["GET_ITEMS"] = z.discriminatedUnion("type", [
	BaseItemsSchema.extend({ type: z.literal("CARD"), info: CardType }),
	BaseItemsSchema.extend({ type: z.literal("FREE"), info: FreeType }),
]);
