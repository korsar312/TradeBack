import type { RestInterface as Interface } from "../Rest.interface.ts";
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

	public async CREATE_LISTING(params: Interface.TSellsItemReq, userId: string) {
		const { desc, name, info, price, type } = params;

		const listingId = this.module.listing.saveNewListing({ name, desc, sellerId: userId, type });
		const dealId = this.module.deal.saveNewDeal({ listingId, sellerId: userId });
		this.module.payment.saveNewPayment({ dealId, price });
		this.module.item.saveNewItem({ info: { ...info, listingId }, type });
		this.module.delivery.saveNewDelivery({ dealId, deliveryPlace: null, departurePlace: null, trackNumber: null });
		this.module.chat.saveNewChat({ dealId });
	}

	public async GET_ITEMS(params: {}) {}
	public async GET_ITEM_DETAIL(params: {}) {}
	public async GET_ORDERS(params: {}) {}
	public async GET_ORDER_DETAIL(params: {}) {}
}
