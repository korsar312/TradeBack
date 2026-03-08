import type { ListingInterface as Interface } from "../Listing.interface.ts";
import ServiceBase from "../../Service.base";
import { Utils } from "../../../../../Utils";

class ListingImp extends ServiceBase implements Interface.IAdapter {
	private CreateListing(data: Interface.TListingMin): Interface.IListing {
		const id = "listing__" + crypto.randomUUID();
		const date = new Date().getTime();

		return { ...data, id, createdAt: date, updatedAt: date, status: "ACTIVE" };
	}

	private UpdateListing(oldData: Interface.IListing, newData: Partial<Interface.IListing>): Interface.IListing {
		const newDate = Number(new Date());

		return { ...oldData, ...newData, updatedAt: newDate };
	}

	private ListingInst(param: Interface.IListing): Interface.IInstance {
		return {
			...param,
			isActive: () => param.status === "ACTIVE",
			isFreeze: () => param.status === "FREEZE",
			isOneSale: () => param.saleKind === "ONE",
		};
	}

	private GetListing = (id: string): Interface.IListing => Utils.error.require(this.API.BD.read.Listing(id), "ENTITY_NOT_FOUND");
	private GetListingByUserId = (userId: string): Interface.IListing[] => this.API.BD.read.ListListingByUserId(userId);

	//==============================================================================================

	public saveNewListing(data: Interface.TListingMin) {
		const listing = this.CreateListing(data);
		this.API.BD.create.Listing(listing);

		return listing.id;
	}

	public getQtyListing(
		limit: number,
		status: Interface.EListingStatus,
		saleKind: Interface.EListingSaleKind,
		cursorId?: string,
		filter?: Interface.TGetParams,
	) {
		return this.API.BD.read
			.ListListings({
				limit,
				cursorId,
				status,
				saleKind,
				sort: filter?.sort,
				sellerId: filter?.sellerId,
				findStr: filter?.findStr,
			})
			.map((el) => this.ListingInst(el));
	}

	public getListing(id: string) {
		const listing = this.GetListing(id);

		return this.ListingInst(listing);
	}

	public getListingByUserId(id: string) {
		const listing = this.GetListingByUserId(id);

		return listing.map(this.ListingInst);
	}

	public freezingListing(id: string): void {
		const listing = this.GetListing(id);
		const newListing = this.UpdateListing(listing, { status: "FREEZE" });

		this.API.BD.update.Listing(newListing);
	}

	public unFreezingListing(id: string): void {
		const listing = this.GetListing(id);
		const newListing = this.UpdateListing(listing, { status: "ACTIVE" });

		this.API.BD.update.Listing(newListing);
	}
}

export default ListingImp;
