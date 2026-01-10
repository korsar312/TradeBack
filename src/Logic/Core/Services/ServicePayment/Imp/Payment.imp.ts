import { PaymentInterface as Interface } from "../Payment.interface.ts";
import ServiceBase from "../../Service.base.ts";
import { Utils } from "../../../../../Utils";

class PaymentImp extends ServiceBase implements Interface.IAdapter {
	private createPayment(data: Interface.TPaymentMin): Interface.IPayment {
		const id = "payment__" + crypto.randomUUID();
		return { ...data, id, status: "INIT" };
	}

	private GetPayment = (id: string): Interface.IPayment => Utils.error.require(this.API.BD.read.Payment(id), "MESSAGE_NOT_FOUND");
	private IsExistPayment = (id: string): boolean => Boolean(this.API.BD.read.Payment(id));

	public saveNewPayment(data: Interface.TPaymentMin) {
		const payment = this.createPayment(data);
		this.API.BD.create.Payment(payment);

		return payment.id;
	}

	public getPaymentsByDealIds(dealIds: string[]) {
		return [];
	}

	public getPayment(id: string) {
		return this.GetPayment(id);
	}
}

export default PaymentImp;
