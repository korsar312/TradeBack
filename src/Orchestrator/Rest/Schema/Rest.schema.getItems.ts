import { z } from "zod";
import type { RestInterface } from "../Rest.interface.ts";
import { SchemaBank, SchemaPriceKopeks, SchemaSort } from "./Rest.schema.public";

const GetItemsCoreSchema = z.object({
	limit: z.number().int().positive(),
	cursorId: z.string().min(1).optional(),
	sellerId: z.string().min(1).optional(),
	findStr: z.string().min(1).optional(),
	sort: SchemaSort.optional(),
	priceUp: SchemaPriceKopeks.optional(),
	priceDown: SchemaPriceKopeks.optional(),
});

const GetItemsCardSchema = GetItemsCoreSchema.extend({
	saleKind: z.literal("GOODS"),
	type: z.literal("CARD"),
	info: z.object({
		bank: SchemaBank,
		age: z.string().min(1).optional(),
	}),
});

const GetItemsGuardSchema = GetItemsCoreSchema.extend({
	saleKind: z.literal("SERVICE"),
	type: z.literal("GUARD"),
	info: z.object({
		cvb: z.string().min(1),
	}),
});

export const getItemsReq: RestInterface.TSchemaMap["GET_ITEMS"] = z
	.discriminatedUnion("type", [GetItemsCardSchema, GetItemsGuardSchema])
	.superRefine((v, ctx) => {
		if (v.priceUp != null && v.priceDown != null && v.priceDown > v.priceUp) {
			ctx.addIssue({
				code: "custom",
				message: "priceDown must be <= priceUp",
				path: ["priceDown"],
			});
		}
	});
