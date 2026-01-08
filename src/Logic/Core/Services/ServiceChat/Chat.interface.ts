export namespace ChatInterface {
	export interface IAdapter {
		saveNewChat(data: IChatMin): string;
	}

	export interface IChat {
		id: string; // id чата
		dealId: string; // FK deals.id (unique => 1↔1)
		buyerSeeTime: number; // просмотр покупателя
		sellerSeeTime: number; // просмотр продавца
		lastMessageId: string | null; // денормализация
		lastMessageAt: number | null; // денормализация
	}

	export type IChatMin = Omit<IChat, "id" | "lastMessageId" | "lastMessageAt" | "buyerSeeTime" | "sellerSeeTime">;
}
