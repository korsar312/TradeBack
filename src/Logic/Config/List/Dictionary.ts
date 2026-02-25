import type { LanguageInterface } from "../../Domain/Services/ServiceLanguage/Language.interface.ts";

const Dictionary: LanguageInterface.TDictionary = {
	BUY: { RU: "Купить" },
} as const;

export default Dictionary;
