import { ListingInterface as Interface } from "../Listing.interface.ts";
import ServiceBase from "../../Service.base.ts";
import { PublicInterface } from "../../Public.interface.ts";

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

	public getQtyListing(limit: number, status: Interface.EListingStatus, type: PublicInterface.ETypeItem, cursorId?: string, filter?: Interface.TGetParams) {
		return this.API.BD.read.ListListings({
			limit,
			cursorId,
			status,
			type,
			sort: filter?.sort,
			sellerId: filter?.sellerId,
			findStr: filter?.findStr,
		});
	}
}

export default ListingImp;
