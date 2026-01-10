import { ItemInterface as Interface } from "../Item.interface.ts";
import ServiceBase from "../../Service.base.ts";
import { Utils } from "../../../../../Utils";
import { PublicInterface } from "../../Public.interface.ts";

class ItemImp extends ServiceBase implements Interface.IAdapter {
	private CreateItemCard(data: Interface.TItemMin): Interface.TItemCard {
		const id = "item__" + crypto.randomUUID();
		return { ...data.info, id };
	}

	private GetItemCard = (id: string, type: PublicInterface.ETypeItem): Interface.TItemInfoVar => {
		switch (type) {
			case "CARD":
				return Utils.error.require(this.API.BD.read.ItemCard(id), "ITEM_NOT_FOUND") as unknown as Interface.TItemInfoVar;
			default:
				throw Utils.error.createError({ reason: "ITEM_TYPE_NOT_FOUND" });
		}
	};

	private GetItemCardByListingId = (listingId: string, type: PublicInterface.ETypeItem): Interface.TItemInfoVar => {
		switch (type) {
			case "CARD":
				return Utils.error.require(this.API.BD.read.ItemCardByListingId(listingId), "ITEM_NOT_FOUND") as unknown as Interface.TItemInfoVar;
			default:
				throw Utils.error.createError({ reason: "ITEM_TYPE_NOT_FOUND" });
		}
	};

	public saveNewItem(data: Interface.TItemMin) {
		switch (data.type) {
			case "CARD":
				const card = this.CreateItemCard(data);
				this.API.BD.create.ItemCard(card);

				return card.id;
			default:
				throw Utils.error.createError({ reason: "ITEM_TYPE_NOT_FOUND" });
		}
	}

	public getItem(id: string, type: PublicInterface.ETypeItem) {
		return this.GetItemCard(id, type);
	}

	public getItemByListingId(listingId: string, type: PublicInterface.ETypeItem) {
		return this.GetItemCardByListingId(listingId, type);
	}
}

export default ItemImp;
