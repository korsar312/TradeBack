import type { DeliveryInterface as Interface } from "../Delivery.interface.ts";
import ServiceBase from "../../Service.base.ts";

class DeliveryImp extends ServiceBase implements Interface.IAdapter {
	private createDelivery(data: Interface.IDeliveryMin): Interface.IDelivery {
		const id = "delivery__" + crypto.randomUUID();
		return { ...data, id, status: "PENDING" };
	}

	public saveNewDelivery(data: Interface.IDeliveryMin) {
		const delivery = this.createDelivery(data);
		this.API.BD.create.Delivery(delivery);

		return delivery.id;
	}
}

export default DeliveryImp;
