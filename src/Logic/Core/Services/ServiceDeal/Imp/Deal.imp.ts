import type { DealInterface as Interface } from "../Deal.interface.ts";
import ServiceBase from "../../Service.base.ts";

class DealImp extends ServiceBase implements Interface.IAdapter {
	private createDeal(data: Interface.IDealMin): Interface.IDeal {
		const id = "deal__" + crypto.randomUUID();
		return { ...data, id, buyerId: null, status: "FULFILLED" };
	}

	public saveNewDeal(data: Interface.IDealMin) {
		const deal = this.createDeal(data);
		this.API.BD.create.Deal(deal);

		return deal.id;
	}
}

export default DealImp;
