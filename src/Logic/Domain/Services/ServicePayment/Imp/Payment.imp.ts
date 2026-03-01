import { PaymentInterface as Interface } from "../Payment.interface";
import ServiceBase, { type IServiceProps } from "../../Service.base";
import { Utils } from "../../../../../Utils";

class PaymentImp extends ServiceBase implements Interface.IAdapter {
	private CreatePayment(data: Interface.TPaymentMin): Interface.IPayment {
		const id = "payment__" + crypto.randomUUID();
		const date = new Date().getTime();
		return { ...data, id, status: "ESCROW", createdAt: date, updatedAt: date };
	}

	private UpdatePayment(oldData: Interface.IPayment, newData: Partial<Interface.IPayment>): Interface.IPayment {
		const newDate = Number(new Date());

		return { ...oldData, ...newData, updatedAt: newDate };
	}

	private GetFee = (): number => this.feePresent;
	private GetPayment = (id: string): Interface.IPayment => Utils.error.require(this.API.BD.read.Payment(id), "ENTITY_NOT_FOUND");
	private GetPaymentByDealId = (dealId: string): Interface.IPayment => Utils.error.require(this.API.BD.read.PaymentByDealId(dealId), "ENTITY_NOT_FOUND");

	//==============================================================================================

	constructor(
		props: IServiceProps,
		private readonly feePresent: number,
	) {
		super(props);
	}

	//==============================================================================================

	public saveNewPayment(data: Interface.TPaymentMin) {
		const payment = this.CreatePayment(data);
		this.API.BD.create.Payment(payment);

		return payment.id;
	}

	public getPriceWidthFee(amount: number): number {
		return amount + this.getPriceFee(amount);
	}

	public getPriceFee(amount: number): number {
		return (amount * this.GetFee()) / 100;
	}

	public getFee() {
		return this.GetFee();
	}

	public getPayment(id: string) {
		return this.GetPayment(id);
	}

	public getPaymentByDealId(dealId: string) {
		return this.GetPaymentByDealId(dealId);
	}

	public cancelPayment(id: string): void {
		const payment = this.GetPayment(id);
		const newPayment = this.UpdatePayment(payment, { status: "CANCEL" });

		this.API.BD.update.Payment(newPayment);
	}
}

export default PaymentImp;
