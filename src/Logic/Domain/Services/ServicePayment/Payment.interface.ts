export namespace PaymentInterface {
	export interface IAdapter {
		saveNewPayment(data: TPaymentMin): string;
		getPriceFee(amount: number): number;
		getFee(): number;
		getPayment(id: string): IPayment;
		getPaymentByDealId(dealId: string): IPayment;
		cancelPayment(id: string): void;
	}

	/**
	 * Платёж.
	 * Фиксирует финансовую часть сделки.
	 */
	export interface IPayment {
		/** id платежа */
		id: string;

		/** FK deals.id (1↔1) */
		dealId: string;

		/** статус платежа */
		status: EPaymentStatus;

		/** зафиксированная сумма на момент покупки */
		price: number;

		/** сумма комиссии */
		fee: number;

		/** время создания */
		createdAt: number;

		/** время последнего обновления */
		updatedAt: number;
	}

	export type TPaymentMin = Omit<IPayment, "id" | "status" | "createdAt" | "updatedAt">;

	export type EPaymentStatus = keyof typeof PaymentStatus;
}

/**
 * Статус платежа.
 * Отражает текущее состояние средств по сделке.
 */
const PaymentStatus = {
	/** деньги заморожены */
	ESCROW: "ESCROW",

	/** деньги переведены продавцу */
	RELEASED: "RELEASED",

	/** деньги разморожены у покупателя */
	REFUNDED: "REFUNDED",

	/** отмена сделки */
	CANCEL: "CANCEL",
} as const;
