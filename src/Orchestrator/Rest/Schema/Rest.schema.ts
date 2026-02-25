import type { RestInterface } from "../Rest.interface.ts";
import { loginReq } from "./Rest.schema.login";
import { createListingReq } from "./Rest.schema.createListing";
import { getItemsReq } from "./Rest.schema.getItems";
import { registerReq } from "./Rest.schema.register";
import { getItemReq } from "./Rest.schema.getItem";
import { awaitPayDepositReq } from "./Rest.schema.awaitPayDeposit";
import { isExistDepositReq } from "./Rest.schema.isExistDeposit";
import { createDepositReq } from "./Rest.schema.createDeposit";
import { removeDepositReq } from "./Rest.schema.removeDeposit";
import { getBalance } from "./Rest.schema.getBalance";

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
	REMOVE_DEPOSIT: removeDepositReq,
	GET_BALANCE: getBalance,
} as const;
