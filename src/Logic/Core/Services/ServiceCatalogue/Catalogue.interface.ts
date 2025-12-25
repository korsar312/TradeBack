import type { PublicInterface } from "../Public.interface.ts";

export namespace CatalogueInterface {
	export interface IAdapter {
		getGoods(): TItemMap;
	}

	export type TItem = {
		name: string;
		image: string;
		price: number;
		rating: TRating;
		sellerName: string;
		sellerId: string;
		info: PublicInterface.TInfoItem;
	};

	export type TRating = PublicInterface.TRating;
	export type EBank = PublicInterface.EBank;
	export type TItemMap = Record<string, TItem>;

	export interface Store {
		goods: TItemMap;
	}
}
