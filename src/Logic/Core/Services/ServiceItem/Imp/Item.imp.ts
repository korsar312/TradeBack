import { ItemInterface as Interface } from "../Item.interface.ts";
import ServiceBase from "../../Service.base.ts";
import { Utils } from "../../../../../Utils";

class ItemImp extends ServiceBase implements Interface.IAdapter {
	private createItemCard(data: Interface.TItemMin): Interface.TItemCard {
		const id = "item__" + crypto.randomUUID();
		return { ...data.info, id };
	}

	public saveNewItem(data: Interface.TItemMin) {
		switch (data.type) {
			case "CARD":
				const card = this.createItemCard(data);
				this.API.BD.create.ItemCard(card);

				return card.id;
			default:
				throw Utils.error.createError({ reason: "ITEM_TYPE_NOT_FOUND" });
		}
	}
}

export default ItemImp;
