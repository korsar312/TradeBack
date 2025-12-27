import type { CatalogueInterface as Interface } from "../Catalogue.interface.ts";
import ServiceBase from "../../Service.base.ts";

class CatalogueImp extends ServiceBase implements Interface.IAdapter {
	public getGoods() {
		return {} as Interface.TItemMap;
	}
}

export default CatalogueImp;
