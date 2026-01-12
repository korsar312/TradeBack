import type { ItemInterface as Interface } from "../Item.interface.ts";
import ServiceBase from "../../Service.base";
import { Utils } from "../../../../../Utils";

class ItemImp extends ServiceBase implements Interface.IAdapter {
	private CreateItemCard(data: Interface.TItemMinCard): Interface.TPickItemInfo<"CARD"> {
		const id = "item__" + crypto.randomUUID();
		return { id, ...data.info };
	}

	private GetItemInfo<T extends Interface.ETypeItem>(id: string, type: T): Interface.TPickItemInfo<T> {
		switch (type) {
			case "CARD":
				return Utils.error.require(this.API.BD.read.ItemCard(id), "ITEM_NOT_FOUND") as Interface.TPickItemInfo<T>;
			default:
				throw Utils.error.createError({ reason: "ITEM_TYPE_NOT_FOUND" });
		}
	}

	private GetItemInfoByListingId<T extends Interface.ETypeItem>(listingId: string, type: T): Interface.TPickItemInfo<T> {
		switch (type) {
			case "CARD":
				return Utils.error.require(this.API.BD.read.ItemCardByListingId(listingId), "ITEM_NOT_FOUND") as Interface.TPickItemInfo<T>;
			default:
				throw Utils.error.createError({ reason: "ITEM_TYPE_NOT_FOUND" });
		}
	}

	public saveNewItem(data: Interface.TItemReq) {
		switch (data.type) {
			case "CARD":
				const card = this.CreateItemCard(data as Interface.TItemMinCard);
				this.API.BD.create.ItemCard(card);

				return card.id;
			default:
				throw Utils.error.createError({ reason: "ITEM_TYPE_NOT_FOUND" });
		}
	}

	public getItem<T extends Interface.ETypeItem>(id: string, type: T): Interface.TPickItem<T> {
		const info = this.GetItemInfo(id, type);
		return { type, info } as Interface.TPickItem<T>;
	}

	public getItemByListingId<T extends Interface.ETypeItem>(listingId: string, type: T): Interface.TPickItem<T> {
		const info = this.GetItemInfoByListingId(listingId, type);
		return { type, info } as Interface.TPickItem<T>;
	}
}

export default ItemImp;
