import { RestInterface as Interface } from "../Rest.interface.ts";
import { TModules } from "../../../Logic";
import { ItemInterface } from "../../../Logic/Core/Services/ServiceItem/Item.interface.ts";

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

	public async REGISTER(params: Interface.IRegisterReq) {
		const { login } = params;
		const user = this.module.user.saveNewUser(login);

		return this.createReturn(user);
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
		const itemRes: unknown[] = [];
		let lastListingId: string | undefined;

		while (itemRes.length < params.limit) {
			const reqQty = params.limit - itemRes.length;

			const listings = this.module.listing.getQtyListing(reqQty, "ACTIVE", params.type, lastListingId || params.cursorId, {
				sort: params.sort,
				sellerId: params.sellerId,
				findStr: params.findStr,
			});

			if (listings.length === 0) break;
			lastListingId = listings.at(-1)?.id;

			listings.forEach((el) => {
				const item = this.module.item.getItemByListingId(el.id, el.type);
				const deal = this.module.deal.getDealByListingId(el.id);
				const seller = this.module.user.getUser(el.sellerId);
				const payment = this.module.payment.getPaymentByDealId(deal.id);

				const itemPick: ItemInterface.TItemInfoVar = {} as ItemInterface.TItemInfoVar;

				switch (params.type) {
					case "CARD":
						if (params.bank && item.bank !== params.bank) return;
						itemPick.bank = item.bank;
				}

				if (params.priceUp != null || params.priceDown != null) {
					const priceUp = params.priceUp ?? Infinity;
					const priceDown = params.priceDown ?? 0;

					if (payment.price < priceDown || payment.price > priceUp) return;
				}

				itemRes.push({
					name: el.name,
					price: payment.price,

					sellerName: seller.nickname,
					sellerId: seller.id,
					sellerLike: 0,
					sellerDislike: 0,

					info: itemPick,
				});
			});
		}

		return this.createReturn(itemRes);
	}

	public async GET_ITEM_DETAIL(params: {}) {}
	public async GET_ORDERS(params: {}) {}
	public async GET_ORDER_DETAIL(params: {}) {}
}
