import type { ListingInterface as Interface } from "../Listing.interface.ts";
import ServiceBase from "../../Service.base";
import { Utils } from "../../../../../Utils";

class ListingImp extends ServiceBase implements Interface.IAdapter {
	private CreateListing(data: Interface.TListingMin): Interface.IListing {
		const id = "listing__" + crypto.randomUUID();
		return { ...data, id, createdAt: new Date().getTime(), status: "ACTIVE" };
	}

	private GetListing = (id: string): Interface.IListing => Utils.error.require(this.API.BD.read.Listing(id), "LISTING_NOT_FOUND");

	public saveNewListing(data: Interface.TListingMin) {
		const listing = this.CreateListing(data);
		this.API.BD.create.Listing(listing);

		return listing.id;
	}

	public updateListing() {}

	public getQtyListing(
		limit: number,
		status: Interface.EListingStatus,
		saleKind: Interface.EListingSaleKind,
		cursorId?: string,
		filter?: Interface.TGetParams,
	) {
		return this.API.BD.read.ListListings({
			limit,
			cursorId,
			status,
			saleKind,
			sort: filter?.sort,
			sellerId: filter?.sellerId,
			findStr: filter?.findStr,
		});
	}

	public getListing(id: string) {
		return this.GetListing(id);
	}
}

export default ListingImp;
