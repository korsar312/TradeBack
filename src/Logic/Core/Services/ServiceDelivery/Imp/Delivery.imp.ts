import type { DeliveryInterface as Interface } from "../Delivery.interface.ts";
import ServiceBase from "../../Service.base.ts";

class DeliveryImp extends ServiceBase implements Interface.IAdapter {
	public createDelivery(data: Interface.TDelivery) {}
}

export default DeliveryImp;
