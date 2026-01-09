import { RestInterface } from "../Rest.interface.ts";
import { z } from "zod";
import { loginReq } from "./Rest.schema.login.ts";
import { createListingReq } from "./Rest.schema.createListing.ts";
import { PublicBank, PublicInterface, PublicSort, PublicTypeItem } from "../../../Logic/Core/Services/Public.interface.ts";
import { getItemsReq } from "./Rest.schema.getItems.ts";

export const RestSchema: RestInterface.TSchemaMap = {
	LOGIN: loginReq,
	CREATE_LISTING: createListingReq,
	GET_ITEMS: getItemsReq,
	GET_ITEM_DETAIL: z.object({}),
	GET_ORDERS: z.object({}),
	GET_ORDER_DETAIL: z.object({}),
} as const;

export const SchemaSort: z.ZodType<PublicInterface.ESort> = z.enum(Object.keys(PublicSort) as PublicInterface.ESort[]);
export const SchemaBank: z.ZodType<PublicInterface.EBank> = z.enum(Object.keys(PublicBank) as PublicInterface.EBank[]);
export const SchemaListingType: z.ZodType<PublicInterface.ETypeItem> = z.enum(Object.keys(PublicTypeItem) as PublicInterface.ETypeItem[]);
export const SchemaPriceKopeks = z.number().int().nonnegative();
