export namespace LanguageInterface {
	export interface IAdapter {
		getWord(text: EWordAll, lang: ELang, param?: TWordParam): string;
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
