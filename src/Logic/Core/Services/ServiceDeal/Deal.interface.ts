export namespace DealInterface {
	export interface IAdapter {
		createDeal(data: TDeal): void;
	}

	export type TDeal = {};
	export type TDealUser = {};
}
