import type { ChatInterface as Interface } from "../Chat.interface.ts";
import ServiceBase from "../../Service.base.ts";

class ChatImp extends ServiceBase implements Interface.IAdapter {
	private createChat(data: Interface.IChatMin): Interface.IChat {
		const id = "chat__" + crypto.randomUUID();
		return { ...data, id, buyerSeeTime: 0, sellerSeeTime: 0, lastMessageId: null, lastMessageAt: null };
	}

	public saveNewChat(data: Interface.IChatMin) {
		const chat = this.createChat(data);
		this.API.BD.create.Chat(chat);

		return chat.id;
	}
}

export default ChatImp;
