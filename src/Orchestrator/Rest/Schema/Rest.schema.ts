import { RestInterface } from "../Rest.interface.ts";
import { z } from "zod";
import { loginReq } from "./Rest.schema.login.ts";
import { createListingReq } from "./Rest.schema.createListing.ts";
import { getItemsReq } from "./Rest.schema.getItems.ts";
import { registerReq } from "./Rest.schema.register.ts";

export const RestSchema: RestInterface.TSchemaMap = {
	LOGIN: loginReq,
	REGISTER: registerReq,
	CREATE_LISTING: createListingReq,
	GET_ITEMS: getItemsReq,
	GET_ITEM_DETAIL: z.object({}),
	GET_ORDERS: z.object({}),
	GET_ORDER_DETAIL: z.object({}),
} as const;
