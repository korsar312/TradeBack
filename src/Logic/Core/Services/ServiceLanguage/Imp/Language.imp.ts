import type { LanguageInterface as Interface } from "../Language.interface.ts";
import ServiceBase, { type IServiceProps } from "../../Service.base";

class LanguageImp extends ServiceBase implements Interface.IAdapter {
	private getStoreWord(dictionary: Interface.TDictionary, word: Interface.EWordAll, lang: Interface.ELang): string {
		if (word && word in dictionary) return dictionary[word as keyof typeof dictionary][lang];

		switch (typeof word) {
			case "boolean":
			case "string":
			case "number":
				return String(word);
			default:
				return "";
		}
	}

	private textReplace(text: string, arrReplace: Interface.EWordAll[]): string {
		return text.replace(/\{\{(\d+)}}/g, (_, group1) => {
			const idx = Number(group1) - 1; // {{1}} → индекс 0
			const replacement = arrReplace[idx];
			return replacement !== undefined // если есть замена
				? String(replacement) // – приводим к строке
				: `{{${group1}}}`; // – иначе оставляем как есть
		});
	}

	private changeCase(text: string, arrReplace: Interface.ECase): string {
		switch (arrReplace) {
			case "CAPITAL":
				return text.toUpperCase();
			case "SMALL":
				return text.toLowerCase();
			default:
				return text;
		}
	}

	private changeWord(text: string, param?: Interface.TWordParam): string {
		let word = text;

		if (param?.case) word = this.changeCase(word, param.case);
		if (param?.arrReplace?.length) word = this.textReplace(word, param.arrReplace);

		return word;
	}

	//==============================================================================================

	constructor(
		props: IServiceProps,
		private readonly dictionary: Interface.TDictionary,
	) {
		super(props);
	}

	//==============================================================================================

	public getWord(word: Interface.EWordAll, lang: Interface.ELang, param?: Interface.TWordParam) {
		const text = this.getStoreWord(this.dictionary, word, lang);

		return this.changeWord(text, param);
	}
}

export default LanguageImp;
