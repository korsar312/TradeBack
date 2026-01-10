import { RestInterface as Interface } from "../Rest.interface.ts";
import { TModules } from "../../../Logic";

export class RestImp implements Interface.IAdapter {
	constructor(private readonly module: TModules) {}

	private createReturn(returned: unknown, code?: number): Interface.TReturn {
		return { code, returned };
	}

	public async LOGIN(params: Interface.ILoginReq) {
		const { login, token } = params;
		const userId = this.module.user.login(login, token);

		return this.createReturn(userId);
	}

	public async CREATE_LISTING(params: Interface.TCreateListingReq, userId: string) {
		const { desc, name, info, price, type } = params;

		const listingId = this.module.listing.saveNewListing({ name, desc, sellerId: userId, type });
		const dealId = this.module.deal.saveNewDeal({ listingId, sellerId: userId });
		this.module.payment.saveNewPayment({ dealId, price });
		this.module.item.saveNewItem({ info: { ...info, listingId }, type });
		this.module.delivery.saveNewDelivery({ dealId, deliveryPlace: null, departurePlace: null, trackNumber: null });
		this.module.chat.saveNewChat({ dealId });
	}

	public async GET_ITEMS(params: Interface.TGetItemsReq) {
		let listings = this.module.listing.getQtyListing(params.limit, "ACTIVE", params.cursorId, {
			type: params.type,
			sort: params.sort,
			sellerId: params.sellerId,
			findStr: params.findStr,
		});

		if (listings.length === 0) return this.createReturn([]);

		const items = this.module.item.getItemsByListingIds(
			listings.map((el) => el.id),
			params.type,
		);
		const cardByListingId = new Map(items.map((el) => [el.info.listingId, el]));

		if (params.type === "CARD") {
			if (params.bank) {
				listings = listings.filter((l) => {
					const card = cardByListingId.get(l.id);
					return !!card && card.info.bank === params.bank;
				});
			}

			if (listings.length === 0) return this.createReturn([]);
		}

		if (typeof params.price === "number") {
			const deals = this.module.deal.getDealsByListingIds(listings.map((el) => el.id));
			const dealIdByListingId = new Map(deals.map((d) => [d.listingId, d.id]));

			const payments = this.module.payment.getPaymentsByDealIds(deals.map((el) => el.id));
			const priceByDealId = new Map(payments.map((p) => [p.dealId, p.price]));

			listings = listings.filter((l) => {
				const dealId = dealIdByListingId.get(l.id);
				if (!dealId) return false;
				const price = priceByDealId.get(dealId);

				return typeof price === "number" && price === params.price;
			});

			if (listings.length === 0) return this.createReturn([]);
		}

		return this.createReturn(listings);
	}

	public async GET_ITEM_DETAIL(params: {}) {}
	public async GET_ORDERS(params: {}) {}
	public async GET_ORDER_DETAIL(params: {}) {}
}
