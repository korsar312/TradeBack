import { UseCasesInterface as Interface } from "../../UseCases.interface";
import UseCasesBase from "../../UseCases.base";

class CreateListing extends UseCasesBase {
	invoke(params: Interface.TCreateListingReq, userId: string): Interface.TCreateListingRes {
		const { desc, name, info, price, saleKind, type } = params;

		const listingId = this.service.listing.saveNewListing({ name, desc, sellerId: userId, saleKind, price });
		this.service.item.saveNewItem({ info: { ...info, listingId } as any, type });

		return listingId;
	}
}

export default CreateListing;
