import type { RestInterface } from "../../../Orchestrator/Rest/Rest.interface.ts";

export const Links: RestInterface.TLinks = {
	LOGIN: "/login",
	GET_GOODS: "/getGoods",
	GET_ITEM: "/getItem",
	GET_ITEM_DETAIL: "/getItemDetail",
	GET_ORDERS: "/getOrders",
	GET_ORDER_DETAIL: "/getOrderDetail",
} as const;

export const LinksHttp: RestInterface.TLinksHttp = {
	LOGIN: "get",
	GET_GOODS: "get",
	GET_ITEM: "get",
	GET_ITEM_DETAIL: "get",
	GET_ORDERS: "get",
	GET_ORDER_DETAIL: "get",
} as const;
