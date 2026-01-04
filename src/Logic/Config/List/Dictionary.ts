import type { MessageInterface } from "../../Core/Services/ServiceMessage/Message.interface.ts";

const Dictionary: MessageInterface.TDictionary = {
	BUY: {
		RU: "Купить",
	},
} as const;

export default Dictionary;
