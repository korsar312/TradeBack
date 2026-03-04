import { UseCasesInterface as Interface } from "../../UseCases.interface";
import UseCasesBase from "../../UseCases.base";

class GetItem extends UseCasesBase {
	invoke(params: Interface.TGetItemReq): Interface.TGetItemRes {
		const listing = this.service.listing.getListing(params.id);

		const item = this.service.item.getItemByListingId(listing.id);
		const seller = this.service.user.getUser(listing.sellerId);

		const itemPick = this.toItemRes(item, true);

		return {
			id: listing.id,
			name: listing.name,
			desc: listing.desc,
			price: this.service.payment.getPriceWidthFee(listing.price),
			status: listing.status,
			sellerId: seller.id,

			sellerName: seller.nickname,
			sellerLike: 0,
			sellerDislike: 0,

			...itemPick,
		};
	}
}

export default GetItem;
