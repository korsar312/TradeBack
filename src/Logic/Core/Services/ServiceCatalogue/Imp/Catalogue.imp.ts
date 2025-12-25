import type { CatalogueInterface as Interface } from "../Catalogue.interface.ts";
import ServiceBase, { type IServiceProps } from "../../Service.base.ts";

class CatalogueImp extends ServiceBase<Interface.Store> implements Interface.IAdapter {
	private setGoods(store: Interface.Store, goods: Interface.TItemMap): Interface.Store {
		return { ...store, goods };
	}

	private updateGoods(goodsList: Interface.TItemMap, newGoods: Interface.TItemMap): Interface.TItemMap {
		return { ...goodsList, ...newGoods };
	}

	private getCurrentItem(itemList: Interface.TItemMap, itemId: string): Interface.TItem | undefined {
		return itemList[itemId];
	}

	//==============================================================================================

	constructor(props: IServiceProps) {
		const store: Interface.Store = {
			goods: {},
		};

		super(props, store);
	}

	//==============================================================================================

	public async requestGoods() {
		const res = await this.API.Links.GET_GOODS();

		this.store = this.setGoods(this.store, res);
	}

	public getGoods() {
		return this.store.goods;
	}
}

export default CatalogueImp;
