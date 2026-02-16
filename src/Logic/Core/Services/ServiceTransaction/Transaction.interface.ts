export namespace TransactionInterface {
	export interface IAdapter {}

	export interface ITransaction {
		id: string;
		userId: string;
		paymentId: string;
		type: ETransactionStatus;
		amount: number;
		createdAt: string;
	}

	export type ETransactionStatus = keyof typeof TransactionStatus;
}

const TransactionStatus = {
	HOLD: "HOLD",
	RELEASE: "RELEASE",
	FEE: "FEE",
	REFUND: "REFUND",
	DEPOSIT: "DEPOSIT",
	WITHDRAW: "WITHDRAW",
};
