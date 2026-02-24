import type { RestInterface } from "../Rest.interface.ts";
import { loginReq } from "./Rest.schema.login";
import { createListingReq } from "./Rest.schema.createListing";
import { getItemsReq } from "./Rest.schema.getItems";
import { registerReq } from "./Rest.schema.register";
import { getItemReq } from "./Rest.schema.getItem";
import { awaitPayDepositReq } from "./Rest.schema.awaitPayDeposit";
import { isExistDepositReq } from "./Rest.schema.isExistDeposit";
import { createDepositReq } from "./Rest.schema.createDeposit";

export const RestSchema: RestInterface.TSchemaMap = {
	LOGIN: loginReq,
	REGISTER: registerReq,
	CREATE_LISTING: createListingReq,
	CREATE_LISTING_ARR: createListingReq.array().min(1),
	GET_ITEMS: getItemsReq,
	GET_ITEM: getItemReq,
	AWAIT_PAY_DEPOSIT: awaitPayDepositReq,
	IS_EXIST_DEPOSIT: isExistDepositReq,
	CREATE_DEPOSIT: createDepositReq,
} as const;
