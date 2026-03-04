import { UseCasesInterface as Interface } from "../../UseCases.interface";
import UseCasesBase from "../../UseCases.base";

class GetOrderList extends UseCasesBase {
	invoke(params: Interface.TGetOrderListReq, userId: string): Interface.TGetOrderListRes {
		const deals = this.service.deal.getDealsByUserId(userId);

		const dealFilter = deals.filter((el) => {
			const one = params.isSell === (el.sellerId !== userId);
			const two = params.isActive === (el.status === "IN_ACTIVE");

			return one && two;
		});

		return dealFilter.map((deal) => {
			const listing = this.service.listing.getListing(deal.listingId);
			const payment = this.service.payment.getPaymentByDealId(deal.id);
			const seller = this.service.user.getUser(deal.sellerId);
			const buyer = this.service.user.getUser(deal.buyerId);
			const item = this.service.item.getItemByListingId(deal.listingId);

			return { listing, deal, seller, payment, buyer, item };
		});
	}
}

export default GetOrderList;
