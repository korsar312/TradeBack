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

/**
 * Ключ слова.
 * Используется для выбора текстового шаблона.
 */
const Word = {
	BUY: "BUY",
} as const;

/**
 * Язык.
 * Определяет локализацию текста.
 */
const Lang = {
	/** русский */
	RU: "RU",
} as const;

/**
 * Регистр.
 * Определяет формат написания слова.
 */
const Case = {
	/** первая буква заглавная / верхний регистр */
	CAPITAL: "CAPITAL",

	/** нижний регистр */
	SMALL: "SMALL",
} as const;
