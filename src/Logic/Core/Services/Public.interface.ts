export namespace PublicInterface {
	export type EBank = keyof typeof PublicBank;
	export type ESort = keyof typeof PublicSort;
	export type ETypeItem = keyof typeof PublicTypeItem;
}

export const PublicBank = {
	ALFA: "ALFA",
	SBER: "SBER",
	TINK: "TINK",
} as const;

export const PublicTypeItem = {
	CARD: "CARD",
} as const;

export const PublicSort = {
	TO_UPPER: "TO_UPPER",
	TO_LOWER: "TO_LOWER",
} as const;
