import type { DeliveryInterface as Interface } from "../Delivery.interface.ts";
import ServiceBase from "../../Service.base.ts";
import { Utils } from "../../../../../Utils";

class DeliveryImp extends ServiceBase implements Interface.IAdapter {
	private CreateDelivery(data: Interface.IDeliveryMin): Interface.IDelivery {
		const id = "delivery__" + crypto.randomUUID();
		return { ...data, id, status: "PENDING" };
	}

	private GetDelivery = (id: string): Interface.IDelivery => Utils.error.require(this.API.BD.read.Delivery(id), "DELIVERY_NOT_FOUND");

	public saveNewDelivery(data: Interface.IDeliveryMin) {
		const delivery = this.CreateDelivery(data);
		this.API.BD.create.Delivery(delivery);

		return delivery.id;
	}

	public getDelivery(id: string) {
		return this.GetDelivery(id);
	}
}

export default DeliveryImp;
