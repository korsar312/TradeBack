import type { PaymentInterface as Interface } from "../Payment.interface.ts";
import ServiceBase, { type IServiceProps } from "../../Service.base";
import { Utils } from "../../../../../Utils";

class PaymentImp extends ServiceBase implements Interface.IAdapter {
	private createPayment(data: Interface.TPaymentMin): Interface.IPayment {
		const id = "payment__" + crypto.randomUUID();
		const date = new Date().getTime();
		return { ...data, id, status: "ESCROW", createdAt: date, updatedAt: date };
	}

	private GetPayment = (id: string): Interface.IPayment => Utils.error.require(this.API.BD.read.Payment(id), "PAYMENT_NOT_FOUND");
	private GetPaymentByDealId = (dealId: string): Interface.IPayment => Utils.error.require(this.API.BD.read.PaymentByDealId(dealId), "PAYMENT_NOT_FOUND");

	//==============================================================================================

	constructor(
		props: IServiceProps,
		private readonly feePresent: number,
	) {
		super(props);
	}

	//==============================================================================================

	public saveNewPayment(data: Interface.TPaymentMin) {
		const payment = this.createPayment(data);
		this.API.BD.create.Payment(payment);

		return payment.id;
	}

	public getFee(sum: number) {
		return Math.floor((sum * this.feePresent) / 100);
	}

	public getPayment(id: string) {
		return this.GetPayment(id);
	}

	public getPaymentByDealId(dealId: string) {
		return this.GetPaymentByDealId(dealId);
	}
}

export default PaymentImp;
