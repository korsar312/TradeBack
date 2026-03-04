import { UseCasesInterface as Interface } from "../../UseCases.interface";
import UseCasesBase from "../../UseCases.base";
import { Utils } from "../../../../../Utils";

class GetOrderList extends UseCasesBase {
	invoke(params: Interface.TGetOrderReq, userId: string): Interface.TGetOrderRes {
		const deal = this.service.deal.getDeal(params.dealId);

		if (deal.sellerId !== userId || deal.buyerId !== userId) throw Utils.error.createError({ reason: "FORBIDDEN" });

		const listing = this.service.listing.getListing(deal.listingId);
		const payment = this.service.payment.getPaymentByDealId(deal.id);
		const seller = this.service.user.getUser(deal.sellerId);
		const buyer = this.service.user.getUser(deal.buyerId);
		const item = this.service.item.getItemByListingId(deal.listingId);

		return { listing, deal, seller, payment, buyer, item };
	}
}

export default GetOrderList;
