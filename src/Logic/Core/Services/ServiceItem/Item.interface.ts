import { typesUtils } from "../../../Libs/TypesUtils";

export namespace ItemInterface {
	export interface IAdapter {
		saveNewItem(data: TItemMin): string;
		getItem<T extends ETypeItem>(id: string, type: T): TPickItem<T>;
		getItemByListingId<T extends ETypeItem>(listingId: string, type: T): TPickItem<T>;
	}

	interface IBaseInfo {
		id: string;
		listingId: string;
	}

	interface ICardInfoAll extends IBaseInfo {
		bank: EBank;
		age: string;
		name: string;
	}
	type ICardInfoPublic = Omit<ICardInfoAll, "name">;
	type ICardInfoFilter = typesUtils.ReplaceKeyStrict<ICardInfoPublic, "bank", EBank[]>;

	interface IFreeInfoAll extends IBaseInfo {
		desc: string;
	}
	type IFreeInfoPublic = Omit<IFreeInfoAll, "desc">;
	type IFreeInfoFilter = IFreeInfoPublic;

	type TItemVar<T extends ETypeItem, B> = { type: T; info: B };
	export type TPickItem<T extends ETypeItem> = Extract<TItemAll, { type: T }>;
	export type TPickItemInfo<T extends ETypeItem> = TPickItem<T>["info"];

	export type TItemCard = TItemVar<"CARD", ICardInfoAll>;
	export type TItemFree = TItemVar<"FREE", IFreeInfoAll>;

	type TItemCardPublic = TItemVar<"CARD", ICardInfoPublic>;
	type TItemFreePublic = TItemVar<"FREE", IFreeInfoPublic>;

	type TItemCardFilter = TItemVar<"CARD", ICardInfoFilter>;
	type TItemFreeFilter = TItemVar<"FREE", IFreeInfoFilter>;

	export type TItemAll = TItemCard | TItemFree;
	export type TItemPublic = TItemCardPublic | TItemFreePublic;
	export type TItemFilter = TItemCardFilter | TItemFreeFilter;

	export type TItemMinCard = typesUtils.TItemChange<TItemCard, "info", "id">;
	export type TItemMin = typesUtils.TItemChange<TItemAll, "info", "id">;

	export type TItemRes = typesUtils.TItemChange<TItemAll, "info", "id" | "listingId">;
	export type TItemResPub = typesUtils.TItemChange<TItemPublic, "info", "id" | "listingId">;
	export type TItemReq = typesUtils.TItemChange<TItemAll, "info", "id" | "listingId">;
	export type TItemReqPub = typesUtils.TItemChange<typesUtils.PartialField<TItemFilter, "info">, "info", "id" | "listingId">;

	export type ETypeItem = keyof typeof ItemTypeItem;
	export type EBank = keyof typeof ItemBank;
}

export const ItemBank = {
	ALFA: "ALFA",
	SBER: "SBER",
	TINK: "TINK",
} as const;

export const ItemTypeItem = {
	CARD: "CARD",
	FREE: "FREE",
} as const;
