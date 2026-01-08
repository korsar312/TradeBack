import { PaymentInterface as Interface } from "../Payment.interface.ts";
import ServiceBase from "../../Service.base.ts";

class PaymentImp extends ServiceBase implements Interface.IAdapter {
	private createPayment(data: Interface.TPaymentMin): Interface.IPayment {
		const id = "payment__" + crypto.randomUUID();
		return { ...data, id, status: "INIT" };
	}

	public saveNewPayment(data: Interface.TPaymentMin) {
		const payment = this.createPayment(data);
		this.API.BD.create.Payment(payment);

		return payment.id;
	}
}

export default PaymentImp;
