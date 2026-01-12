import type { RestInterface } from "../Rest.interface.ts";
import { z } from "zod";
import { loginReq } from "./Rest.schema.login";
import { createListingReq } from "./Rest.schema.createListing";
import { getItemsReq } from "./Rest.schema.getItems";
import { registerReq } from "./Rest.schema.register";

export const RestSchema: RestInterface.TSchemaMap = {
	LOGIN: loginReq,
	REGISTER: registerReq,
	CREATE_LISTING: createListingReq,
	CREATE_LISTING_ARR: createListingReq.array().min(1),
	GET_ITEMS: getItemsReq,
	GET_ITEM_DETAIL: z.object({}),
	GET_ORDERS: z.object({}),
	GET_ORDER_DETAIL: z.object({}),
} as const;
