export namespace PublicInterface {
	export type ESort = keyof typeof PublicSort;
}

export const PublicSort = {
	TO_UPPER: "TO_UPPER",
	TO_LOWER: "TO_LOWER",
} as const;
