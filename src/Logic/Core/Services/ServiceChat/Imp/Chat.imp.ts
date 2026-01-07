import type { ChatInterface as Interface } from "../Chat.interface.ts";
import ServiceBase from "../../Service.base.ts";

class ChatImp extends ServiceBase implements Interface.IAdapter {
	public createChat(data: Interface.IChat) {}
}

export default ChatImp;
