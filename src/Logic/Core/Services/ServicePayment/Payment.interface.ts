export namespace PaymentInterface {
	export interface IAdapter {
		createPayment(data: TPayment): void;
	}

	export type TPayment = {};
	export type TPaymentUser = {};
}
