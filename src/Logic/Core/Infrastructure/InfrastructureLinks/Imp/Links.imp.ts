import type { LinksInterface as Interface } from "../Links.interface";

class LinksImp implements Interface.IAdapter {
	private readonly links: Interface.TLinksList;

	private async request<T>({ link, method, param }: Interface.ERequestParam): Promise<T> {
		const url = new URL(this.links[link], "http://");

		url.search = new URLSearchParams(param).toString();
		const res = await fetch(url.toString(), { method });

		return await res.json();
	}

	//==============================================================================================

	constructor(links: Interface.TLinksList) {
		this.links = links;
	}

	//==============================================================================================
}

export default LinksImp;
