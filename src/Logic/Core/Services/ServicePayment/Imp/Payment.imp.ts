import type { PaymentInterface as Interface } from "../Payment.interface.ts";
import ServiceBase from "../../Service.base.ts";

class PaymentImp extends ServiceBase implements Interface.IAdapter {
	public createPayment(data: Interface.IPayment) {}
}

export default PaymentImp;
