import type { ListingInterface as Interface } from "../Listing.interface.ts";
import ServiceBase from "../../Service.base.ts";

class ListingImp extends ServiceBase implements Interface.IAdapter {
	public createListing() {}
	public updateListing() {}
	public getListing() {
		return {};
	}
}

export default ListingImp;
