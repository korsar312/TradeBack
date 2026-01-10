import type { ChatInterface as Interface } from "../Chat.interface.ts";
import ServiceBase from "../../Service.base.ts";
import { Utils } from "../../../../../Utils";

class ChatImp extends ServiceBase implements Interface.IAdapter {
	private CreateChat(data: Interface.IChatMin): Interface.IChat {
		const id = "chat__" + crypto.randomUUID();
		return { ...data, id, buyerSeeTime: 0, sellerSeeTime: 0, lastMessageId: null, lastMessageAt: null };
	}

	private GetChat = (id: string): Interface.IChat => Utils.error.require(this.API.BD.read.Chat(id), "CHAT_NOT_FOUND");

	public saveNewChat(data: Interface.IChatMin) {
		const chat = this.CreateChat(data);
		this.API.BD.create.Chat(chat);

		return chat.id;
	}

	public getChat(id: string) {
		return this.GetChat(id);
	}
}

export default ChatImp;
