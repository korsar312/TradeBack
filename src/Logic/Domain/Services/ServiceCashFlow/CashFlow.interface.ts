export namespace CashFlowInterface {
	export interface IAdapter {
		addUserMoney(amount: number): Promise<void>;
		missingUserMoney(amount: number): Promise<void>;
	}
}
