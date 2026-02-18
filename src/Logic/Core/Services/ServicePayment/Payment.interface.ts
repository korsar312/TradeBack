export namespace PaymentInterface {
	export interface IAdapter {
		saveNewPayment(data: TPaymentMin): string;
		getFee(sun: number): number;
		getPayment(id: string): IPayment;
		getPaymentByDealId(dealId: string): IPayment;
	}

	export interface IPayment {
		id: string; // id платежа
		dealId: string; // FK deals.id (unique => 1↔1)
		status: EPaymentStatus; // статус платежа
		price: number; // зафиксированная сумма на момент покупки
		fee: number; // сумма комиссии
		createdAt: number;
		updatedAt: number;
	}

	export type TPaymentMin = Omit<IPayment, "id" | "status" | "createdAt" | "updatedAt">;

	export type EPaymentStatus = keyof typeof PaymentStatus;
}

const PaymentStatus = {
	ESCROW: "ESCROW", // деньги заморожены
	RELEASED: "RELEASED", // деньги переведены продавцу
	REFUNDED: "REFUNDED", // деньги разморожены у покупателя
};
