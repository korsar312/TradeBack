import type { MessageInterface as Interface } from "../Message.interface.ts";
import ServiceBase, { type IServiceProps } from "../../Service.base.ts";

class MessageImp extends ServiceBase<Interface.Store> implements Interface.IAdapter {
	private getCurrentLang(store: Interface.Store): Interface.ELang {
		return store.lang;
	}

	private getStoreWord(store: Interface.Store, word: Interface.EWordAll, lang: Interface.ELang): string {
		if (word && word in store.dictionary) return store.dictionary[word as keyof typeof store.dictionary][lang];

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

	constructor(props: IServiceProps, dictionary: Interface.TDictionary) {
		const store: Interface.Store = {
			dictionary,
			lang: "RU",
		};

		super(props, store);
	}

	//==============================================================================================

	public getWord(word: Interface.EWordAll, param?: Interface.TWordParam) {
		const lang = this.getCurrentLang(this.store);
		const text = this.getStoreWord(this.store, word, lang);

		return this.changeWord(text, param);
	}
}

export default MessageImp;
