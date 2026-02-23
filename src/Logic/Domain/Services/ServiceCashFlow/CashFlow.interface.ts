export namespace CashFlowInterface {
	export interface IAdapter {
		createWallet(): Promise<TWallet>;

		checkMoneyWallet(address: string, type: EMoneyType): Promise<number>;

		getActiveDeposit(id: string): TDeposit | null;
		createDeposit(userId: string, amount: number): Promise<TDeposit>;
		checkTransaction(address: string, minTimestamp: string, sum: string, timeChecking: number): Promise<boolean>;
		sendUSDT(privateKey: string, toAddress: string, amount: number): Promise<boolean>;
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
