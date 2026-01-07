import { MessageInterface as Interface } from "../Message.interface.ts";
import ServiceBase from "../../Service.base.ts";

class MessageImp extends ServiceBase implements Interface.IAdapter {
	public createMessage() {}
}

export default MessageImp;
