import { PaymentInterface as Interface } from "../Payment.interface.ts";
import ServiceBase from "../../Service.base.ts";
import { Utils } from "../../../../../Utils";

class PaymentImp extends ServiceBase implements Interface.IAdapter {
	private createPayment(data: Interface.TPaymentMin): Interface.IPayment {
		const id = "payment__" + crypto.randomUUID();
		return { ...data, id, status: "INIT" };
	}

	private GetPayment = (id: string): Interface.IPayment => Utils.error.require(this.API.BD.read.Payment(id), "PAYMENT_NOT_FOUND");
	private GetPaymentByDealId = (dealId: string): Interface.IPayment => Utils.error.require(this.API.BD.read.PaymentByDealId(dealId), "PAYMENT_NOT_FOUND");

	public saveNewPayment(data: Interface.TPaymentMin) {
		const payment = this.createPayment(data);
		this.API.BD.create.Payment(payment);

		return payment.id;
	}

	public getPayment(id: string) {
		return this.GetPayment(id);
	}

	public getPaymentByDealId(dealId: string) {
		return this.GetPaymentByDealId(dealId);
	}
}

export default PaymentImp;
