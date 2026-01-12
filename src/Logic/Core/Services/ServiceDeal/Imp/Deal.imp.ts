import type { DealInterface as Interface } from "../Deal.interface.ts";
import ServiceBase from "../../Service.base";
import { Utils } from "../../../../../Utils";

class DealImp extends ServiceBase implements Interface.IAdapter {
	private CreateDeal(data: Interface.IDealMin): Interface.IDeal {
		const id = "deal__" + crypto.randomUUID();
		return { ...data, id, buyerId: null, status: "FULFILLED" };
	}

	private GetDeal = (id: string): Interface.IDeal => Utils.error.require(this.API.BD.read.Deal(id), "DEAL_NOT_FOUND");
	private GetDealsByListingId = (listingId: string): Interface.IDeal[] => this.API.BD.read.ListDealsByListingId(listingId);

	public saveNewDeal(data: Interface.IDealMin) {
		const deal = this.CreateDeal(data);
		this.API.BD.create.Deal(deal);

		return deal.id;
	}

	public getDeal(id: string) {
		return this.GetDeal(id);
	}

	public getDealsByListingId(listingId: string) {
		return this.GetDealsByListingId(listingId);
	}
}

export default DealImp;
