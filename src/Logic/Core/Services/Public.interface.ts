export namespace PublicInterface {
	export type TInfoItem = TInfoVar;
	type TItemType = { type: ETypeItem };

	type TInfoVar = TItemTypeCard | TDetailItemTypeCard;
	interface TItemTypeCard extends TItemType {
		type: "CARD";
		bank: EBank;
	}
	export interface TDetailItemTypeCard extends TItemTypeCard {
		desc: string;
	}

	export type TRating = 1 | 2 | 3 | 4 | 5;
	export type EBank = keyof typeof Bank;
	export type ETypeItem = keyof typeof TypeItem;
}

const Bank = {
	ALFA: "ALFA",
	SBER: "SBER",
	TINK: "TINK",
} as const;

const TypeItem = {
	CARD: "CARD",
} as const;
