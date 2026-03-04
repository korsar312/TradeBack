import { ItemInterface as Interface, ItemTypeItem } from "../Item.interface";
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
				return Utils.error.require(this.API.BD.read.ItemCard(id), "ENTITY_NOT_FOUND") as Interface.TPickItemInfo<T>;
			default:
				throw Utils.error.createError({ reason: "ENTITY_NOT_FOUND" });
		}
	}

	private GetItemInfoByListingId(listingId: string): Interface.TItemAll {
		const typeItem = Object.keys(ItemTypeItem) as Interface.ETypeItem[];
		const itemArr: Interface.TItemAll[] = typeItem
			.map((el) => {
				switch (el) {
					case "CARD":
						return { type: el, info: this.API.BD.read.ItemCardByListingId(listingId) } as Interface.TItemAll;
					default:
						return null as unknown as Interface.TItemAll;
				}
			})
			.filter(Boolean);

		const returned = itemArr[0];
		if (!returned) throw Utils.error.createError({ reason: "ENTITY_NOT_FOUND" });

		return returned;
	}

	//==============================================================================================

	public saveNewItem(data: Interface.TItemReq) {
		switch (data.type) {
			case "CARD":
				const card = this.CreateItemCard(data as Interface.TItemMinCard);
				this.API.BD.create.ItemCard(card);

				return card.id;
			default:
				throw Utils.error.createError({ reason: "ENTITY_NOT_FOUND" });
		}
	}

	public getItem<T extends Interface.ETypeItem>(id: string, type: T): Interface.TPickItem<T> {
		const info = this.GetItemInfo(id, type);
		return { type, info } as Interface.TPickItem<T>;
	}

	public getItemByListingId(listingId: string): Interface.TItemAll {
		return this.GetItemInfoByListingId(listingId);
	}
}

export default ItemImp;
