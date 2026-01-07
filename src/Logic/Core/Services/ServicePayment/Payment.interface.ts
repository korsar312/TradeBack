export namespace PaymentInterface {
	export interface IAdapter {
		createPayment(data: IPayment): void;
	}

	export interface IPayment {
		id: string; // id платежа
		dealId: string; // FK deals.id (unique => 1↔1)
		status: EPaymentStatus; // статус платежа
		price: number; // сумма (INTEGER)
	}

	export type EPaymentStatus = keyof typeof PaymentStatus;
}

const PaymentStatus = {
	INIT: "INIT",
	AUTHORIZED: "AUTHORIZED",
	IN_ESCROW: "IN_ESCROW",
	RELEASED: "RELEASED",
	REFUNDED: "REFUNDED",
	FAILED: "FAILED",
};
