import { UseCasesInterface as Interface } from "../UseCases.interface";
import UseCasesBase from "../UseCases.base";
import { Utils } from "../../../../Utils";

class StartBuyItem extends UseCasesBase {
	invoke(params: Interface.TStartBuyItemReq, userId: string, operationId: string): Interface.TStartBuyItemRes {
		const listing = this.service.listing.getListing(params.listingId);
		if (!listing.isActive()) throw Utils.error.createError({ reason: "INVALID_STATE" });
		if (listing.sellerId === userId) throw Utils.error.createError({ reason: "BAD_REQUEST" });

		const balanceUser = this.service.transaction.userAccounting(userId);
		const price = listing.price;
		const fee = this.service.payment.getPriceFee(price);
		const fullPrice = price + fee;

		const isAvailable = balanceUser.balance >= fullPrice;
		if (!isAvailable) throw Utils.error.createError({ reason: "NOT_ENOUGH_MONEY" });

		let dealId: string | null = null;
		let paymentId: string | null = null;

		let transBalanceId: string | null = null;
		let transHoldId: string | null = null;

		try {
			if (listing.isOneSale()) this.service.listing.freezingListing(listing.id);

			dealId = this.service.deal.saveNewDeal({ buyerId: userId, listingId: listing.id, sellerId: listing.sellerId });
			paymentId = this.service.payment.saveNewPayment({ fee, dealId, price });

			transBalanceId = this.service.transaction.walletMinus({ amount: fullPrice, paymentId, operationId, userId });
			transHoldId = this.service.transaction.holdPlus({ amount: fullPrice, paymentId, operationId, userId });
		} catch (e) {
			if (transHoldId) this.service.transaction.removeTransaction(transHoldId);
			if (transBalanceId) this.service.transaction.removeTransaction(transBalanceId);

			if (paymentId) this.service.payment.cancelPayment(paymentId);
			if (dealId) this.service.deal.cancelDeal(dealId);

			if (listing.isOneSale()) this.service.listing.unFreezingListing(listing.id);

			throw e;
		}
	}
}

export default StartBuyItem;
