export namespace MessageInterface {
	export interface IAdapter {
		getWord(text: EWordAll, param?: TWordParam): string;
	}

	export interface Store {
		dictionary: TDictionary;
		lang: ELang;
	}

	export type EWord = keyof typeof Word;
	export type ELang = keyof typeof Lang;
	export type ECase = keyof typeof Case;

	type TMapWord = Record<ELang, string>;

	export type TDictionary = Record<EWord, TMapWord>;
	export type EWordAll = EWord | string | number | undefined;

	export type TWordParam = { arrReplace?: EWordAll[]; case?: ECase };
}

const Word = {
	BUY: "BUY",
} as const;

const Lang = {
	RU: "RU",
} as const;

const Case = {
	CAPITAL: "CAPITAL",
	SMALL: "SMALL",
} as const;
