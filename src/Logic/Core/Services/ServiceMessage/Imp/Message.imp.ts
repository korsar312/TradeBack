import type { MessageInterface as Interface } from "../Message.interface.ts";
import ServiceBase from "../../Service.base";
import { Utils } from "../../../../../Utils";

class MessageImp extends ServiceBase implements Interface.IAdapter {
	private CreateMessage(data: Interface.IMessage): Interface.IMessage {
		const id = "message__" + crypto.randomUUID();
		return { ...data, id };
	}

	private GetMessage = (id: string): Interface.IMessage => Utils.error.require(this.API.BD.read.Message(id), "MESSAGE_NOT_FOUND");

	public createMessage(data: Interface.IMessage) {
		const message = this.CreateMessage(data);
		this.API.BD.create.Message(message);

		return message.id;
	}

	public getMessagesForChatId(chatId: string) {
		return [];
	}

	public getMessage(id: string) {
		return this.GetMessage(id);
	}
}

export default MessageImp;
