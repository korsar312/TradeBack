import type { RestInterface } from "../../../Orchestrator/Rest/Rest.interface.ts";

export const Links: RestInterface.TLinks = {
	LOGIN: {
		link: "/login",
		http: "post",
		role: ["USER", "ADMIN"],
	},
	CREATE_LISTING: {
		link: "/createListing",
		http: "post",
		role: ["USER", "ADMIN"],
	},
	GET_ITEMS: {
		link: "/getItem",
		http: "get",
		role: ["USER", "ADMIN"],
	},
	GET_ITEM_DETAIL: {
		link: "/getItemDetail",
		http: "get",
		role: ["USER", "ADMIN"],
	},
	GET_ORDERS: {
		link: "/getOrders",
		http: "get",
		role: ["USER", "ADMIN"],
	},
	GET_ORDER_DETAIL: {
		link: "/getOrderDetail",
		http: "get",
		role: ["USER", "ADMIN"],
	},
} as const;
