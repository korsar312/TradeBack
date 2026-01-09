import { RestInterface } from "../Rest.interface.ts";
import { z } from "zod";
import { Bank, PublicInterface, TypeItem } from "../../../Logic/Core/Services/Public.interface.ts";

const ListingTypeSchema: z.ZodType<PublicInterface.ETypeItem> = z.enum(Object.keys(TypeItem) as PublicInterface.ETypeItem[]);
const BankSchema: z.ZodType<PublicInterface.EBank> = z.enum(Object.keys(Bank) as PublicInterface.EBank[]);

const PriceKopeksSchema = z.number().int().nonnegative();

const BaseListingSchema = z.object({
	name: z.string().min(1),
	desc: z.string().min(1),
	price: PriceKopeksSchema,
});

const SellsItemCardInfoSchema = z.object({
	name: z.string().min(1),
	bank: BankSchema,
});

const CreateListingSchema = z.discriminatedUnion("type", [
	BaseListingSchema.extend({ type: ListingTypeSchema, info: SellsItemCardInfoSchema }),
]);

export const RestSchema: RestInterface.TSchemaMap = {
	LOGIN: z.object({
		login: z.string().min(1),
		token: z.string().min(1),
	}),
	CREATE_LISTING: CreateListingSchema,
	GET_ITEMS: z.object({}),
	GET_ITEM_DETAIL: z.object({}),
	GET_ORDERS: z.object({}),
	GET_ORDER_DETAIL: z.object({}),
} as const;
