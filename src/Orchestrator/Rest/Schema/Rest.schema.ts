import type { RestInterface } from "../Rest.interface.ts";
import { loginReq } from "./Rest.schema.login";
import { createListingReq } from "./Rest.schema.createListing";
import { getItemsReq } from "./Rest.schema.getItems";
import { registerReq } from "./Rest.schema.register";
import { getItemReq } from "./Rest.schema.getItem";

export const RestSchema: RestInterface.TSchemaMap = {
	LOGIN: loginReq,
	REGISTER: registerReq,
	CREATE_LISTING: createListingReq,
	CREATE_LISTING_ARR: createListingReq.array().min(1),
	GET_ITEMS: getItemsReq,
	GET_ITEM: getItemReq,
} as const;
