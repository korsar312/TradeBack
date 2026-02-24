import type { RestInterface } from "../../../Orchestrator/Rest/Rest.interface.ts";

export const Links: RestInterface.TLinks = {
	LOGIN: {
		link: "/login",
		http: "post",
		role: ["USER", "ADMIN"],
	},
	REGISTER: {
		link: "/register",
		http: "post",
		role: ["USER", "ADMIN"],
	},
	CREATE_LISTING: {
		link: "/createListing",
		http: "post",
		role: ["USER", "ADMIN"],
	},
	CREATE_LISTING_ARR: {
		link: "/createListingArr",
		http: "post",
		role: ["USER", "ADMIN"],
	},
	GET_ITEMS: {
		link: "/getItems",
		http: "post",
		role: ["USER", "ADMIN"],
	},
	GET_ITEM: {
		link: "/getItem",
		http: "get",
		role: ["USER", "ADMIN"],
	},

	AWAIT_PAY_DEPOSIT: {
		link: "/awaitPayDeposit",
		http: "get",
		role: ["USER", "ADMIN"],
	},

	IS_EXIST_DEPOSIT: {
		link: "/isExistDeposit",
		http: "get",
		role: ["USER", "ADMIN"],
	},

	CREATE_DEPOSIT: {
		link: "/createDeposit",
		http: "post",
		role: ["USER", "ADMIN"],
	},
} as const;
