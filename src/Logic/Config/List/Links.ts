import type { RestInterface } from "../../../Orchestrator/Rest/Rest.interface.ts";

export const Links: RestInterface.TLinks = {
	LOGIN: {
		link: "/login",
		http: "post",
	},
	CREATE_LISTING: {
		link: "/createLot",
		http: "post",
	},
	GET_GOODS: {
		link: "/getGoods",
		http: "get",
	},
	GET_ITEM: {
		link: "/getItem",
		http: "get",
	},
	GET_ITEM_DETAIL: {
		link: "/getItemDetail",
		http: "get",
	},
	GET_ORDERS: {
		link: "/getOrders",
		http: "get",
	},
	GET_ORDER_DETAIL: {
		link: "/getOrderDetail",
		http: "get",
	},
} as const;
