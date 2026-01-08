import { ListingInterface as Interface } from "../Listing.interface.ts";
import ServiceBase from "../../Service.base.ts";

class ListingImp extends ServiceBase implements Interface.IAdapter {
	private createListing(data: Interface.TListingMin): Interface.IListing {
		const id = "listing__" + crypto.randomUUID();
		return { ...data, id, createdAt: new Date().getTime(), status: "ACTIVE" };
	}

	public saveNewListing(data: Interface.TListingMin) {
		const listing = this.createListing(data);
		this.API.BD.create.Listing(listing);

		return listing.id;
	}

	public updateListing() {}
	public getListing() {
		return "";
	}
}

export default ListingImp;
