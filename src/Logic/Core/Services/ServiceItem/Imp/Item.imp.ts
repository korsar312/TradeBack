import type { ItemInterface as Interface } from "../Item.interface.ts";
import ServiceBase from "../../Service.base.ts";

class ItemImp extends ServiceBase implements Interface.IAdapter {
	public createItem(data: Interface.TItem) {}
}

export default ItemImp;
