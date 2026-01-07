import type { DealInterface as Interface } from "../Deal.interface.ts";
import ServiceBase from "../../Service.base.ts";

class DealImp extends ServiceBase implements Interface.IAdapter {
	public createDeal(data: Interface.IDeal) {}
}

export default DealImp;
