export namespace CashFlowInterface {
	export interface IAdapter {
		createWallet(): Promise<TWallet>;
		getWalletAddress(): string;

		checkUSDT(address?: string): Promise<number>;
		checkTrx(address?: string): Promise<number>;

		getActiveDeposit(id: string): TDeposit | null;
		createDeposit(): Promise<TDeposit>;
		checkTransaction(address: string, minTimestamp: string, sum: string, timeChecking: number): Promise<boolean>;
		sendUSDT(privateKey: string, toAddress: string, amount: number): Promise<boolean>;
	}

	export type TDeposit = {
		address: string;
		timeOut: number;
		amount: number;
	};

	export type TWallet = {
		privateKey: string;
		publicKey: string;
		address: string;
	};
}
