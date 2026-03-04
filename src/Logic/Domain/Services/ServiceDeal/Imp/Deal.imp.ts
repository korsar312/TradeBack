import type { DealInterface as Interface } from "../Deal.interface.ts";
import ServiceBase from "../../Service.base";
import { Utils } from "../../../../../Utils";

class DealImp extends ServiceBase implements Interface.IAdapter {
	private CreateDeal(data: Interface.IDealMin): Interface.IDeal {
		const id = "deal__" + crypto.randomUUID();
		const date = new Date().getTime();

		return { ...data, id, status: "IN_ACTIVE", buyerCancelAt: null, sellerCancelAt: null, createdAt: date };
	}

	private UpdateDeal(oldData: Interface.IDeal, newData: Partial<Interface.IDeal>): Interface.IDeal {
		return { ...oldData, ...newData };
	}

	private GetDeal = (id: string): Interface.IDeal => Utils.error.require(this.API.BD.read.Deal(id), "ENTITY_NOT_FOUND");
	private GetDealsByListingId = (listingId: string): Interface.IDeal[] => this.API.BD.read.ListDealsByListingId(listingId);
	private GetDealsByUserId = (userId: string): Interface.IDeal[] => this.API.BD.read.ListDealsByUserId(userId);

	//==============================================================================================

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

	public getDealsByUserId(userId: string) {
		return this.GetDealsByUserId(userId);
	}

	public cancelDeal(id: string): void {
		const deal = this.GetDeal(id);
		const newDeal = this.UpdateDeal(deal, { status: "CANCELLED" });

		this.API.BD.update.Deal(newDeal);
	}
}

export default DealImp;
