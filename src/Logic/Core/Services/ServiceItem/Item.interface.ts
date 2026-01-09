import { PublicInterface } from "../Public.interface.ts";

export namespace ItemInterface {
	export interface IAdapter {
		saveNewItem(data: TItemMin): string;
	}

	interface IItemId {
		id: string; // id записи деталей товара
		listingId: string; // FK listings.id (unique => 1↔1)
	}

	interface IItemVar<T> {
		type: PublicInterface.ETypeItem;
		info: T & IItemId;
	}

	interface IItemCard extends IItemVar<IItemCardInfo> {
		type: "CARD";
	}

	interface IItemCardInfo {
		bank: string; // банк
		name: string; // имя на карте
	}

	export type TItemCard = IItemCard["info"];

	export type TItem = IItemCard;

	export type TItemChange<T extends keyof TItem, B extends keyof TItem[T]> = Omit<TItem, T> & { info: Omit<TItem[T], B> };
	export type TItemMin = TItemChange<"info", "id">;
}
