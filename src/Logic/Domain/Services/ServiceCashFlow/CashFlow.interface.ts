export namespace CashFlowInterface {
	export interface IAdapter {
		createDeposit(userId: string, amount: number): Promise<TDeposit>;
		getActiveDeposit(userId: string): TDeposit | null;
		withdraw(toAddress: string, amount: number): Promise<unknown>;
		checkMoneyWallet(address: string, type: EMoneyType): Promise<number>;
		checkTransaction(deposit: TDeposit): Promise<boolean>;
		createWallet(): Promise<TWallet>;
		sendUSDT(privateKey: string, toAddress: string, amount: number): Promise<unknown>;
		removeDeposit(userId: string): void;
		awaitPay(userId: string): Promise<boolean>;
	}

	export type TDeposit = {
		address: string;
		amount: string;
		timeStart: number;
		timeEnd: number;
	};

	export type TWallet = {
		privateKey: string;
		publicKey: string;
		address: string;
	};

	export type EMoneyType = keyof typeof CashFlowMoneyType;
}

const CashFlowMoneyType = {
	TRX: "TRX",
	USDT: "USDT",
};
