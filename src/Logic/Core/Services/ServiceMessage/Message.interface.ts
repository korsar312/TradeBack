export namespace MessageInterface {
	export interface IAdapter {
		createMessage(data: IMessage): void;
	}

	export interface IMessage {
		id: string; // id сообщения
		chatId: string; // FK chats.id
		userId: string; // FK users.id
		createdAt: number; // время сообщения
		text: string; // текст
	}
}
