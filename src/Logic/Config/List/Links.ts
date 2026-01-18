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
} as const;
