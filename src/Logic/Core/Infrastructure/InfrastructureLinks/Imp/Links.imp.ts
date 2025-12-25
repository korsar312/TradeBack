import type { LinksInterface as Interface } from "../Links.interface";
import type { CatalogueInterface } from "../../../Services/ServiceCatalogue/Catalogue.interface.ts";
import type { OrderInterface } from "../../../Services/ServiceOrder/Order.interface.ts";
import type { UserInterface } from "../../../Services/ServiceUser/User.interface.ts";

class LinksImp implements Interface.IAdapter {
	private readonly links: Interface.TLinksList;
	private readonly address: string;

	private async request<T>({ link, method, param }: Interface.ERequestParam): Promise<T> {
		const url = new URL(this.links[link], "http://" + this.address);

		url.search = new URLSearchParams(param).toString();
		const res = await fetch(url.toString(), { method });

		return await res.json();
	}

	//==============================================================================================

	constructor(links: Interface.TLinksList, address: string) {
		this.links = links;
		this.address = address;
	}

	//==============================================================================================

	public LOGIN(token: string) {
		return this.request<UserInterface.TUser>({ link: "LOGIN", method: "GET", param: { token } });
	}
	public GET_GOODS() {
		return this.request<CatalogueInterface.TItemMap>({ link: "GET_GOODS", method: "GET" });
	}
	public GET_ITEM(itemId: string[]) {
		return this.request<CatalogueInterface.TItemMap>({ link: "GET_ITEM", method: "GET", param: { itemId } });
	}
	public GET_ITEM_DETAIL(itemId: string[]) {
		return this.request<CatalogueInterface.TItemMap>({ link: "GET_ITEM_DETAIL", method: "GET", param: { itemId } });
	}
	public GET_ORDERS() {
		return this.request<OrderInterface.TOrderMap>({ link: "GET_ORDERS", method: "GET" });
	}
	public GET_ORDER_DETAIL(itemId: string[]) {
		return this.request<OrderInterface.TOrderMap>({ link: "GET_ORDER_DETAIL", method: "GET", param: { itemId } });
	}
}

export default LinksImp;
