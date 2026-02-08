import type { RestInterface as Interface } from "../Rest.interface.ts";
import { TModules } from "../../../Logic";
import { ItemInterface } from "../../../Logic/Core/Services/ServiceItem/Item.interface";

export class RestImp implements Interface.IAdapter {
	constructor(private readonly module: TModules) {}

	public async LOGIN(params: Interface.ILoginReq) {
		const { login, token } = params;
		const userId = this.module.user.login(login, token);

		return { returned: userId };
	}

	public async REGISTER(params: Interface.IRegisterReq) {
		const { login } = params;
		const user = this.module.user.saveNewUser(login);

		return { returned: user };
	}

	public async CREATE_LISTING(params: Interface.ICreateListingReq, userId: string) {
		const { desc, name, info, price, saleKind, type } = params;
		const listingId = this.module.listing.saveNewListing({ name, desc, sellerId: userId, saleKind, price });
		const dealId = this.module.deal.saveNewDeal({ listingId, sellerId: userId });
		this.module.payment.saveNewPayment({ dealId, price });
		this.module.item.saveNewItem({ info: { ...info, listingId } as any, type });
		this.module.delivery.saveNewDelivery({ dealId, deliveryPlace: null, departurePlace: null, trackNumber: null });
		this.module.chat.saveNewChat({ dealId });
	}

	public async CREATE_LISTING_ARR(params: Interface.ICreateListingReq[], userId: string) {
		params.forEach((el) => this.CREATE_LISTING(el, userId));
	}

	public async GET_ITEMS(params: Interface.IGetItemsReq) {
		const itemRes: Interface.IGetItemsRes[] = [];
		let lastListingId: string | undefined;

		while (itemRes.length < params.limit) {
			const reqQty = params.limit - itemRes.length;

			const listings = this.module.listing.getQtyListing(reqQty, "ACTIVE", params.saleKind, lastListingId || params.cursorId, {
				sort: params.sort,
				sellerId: params.sellerId,
				findStr: params.findStr,
			});

			if (listings.length === 0) break;
			lastListingId = listings.at(-1)?.id;

			listings.forEach((el) => {
				const item = this.module.item.getItemByListingId(el.id, params.type);
				const seller = this.module.user.getUser(el.sellerId);

				if (params.type !== item.type) return;

				if (item.type === "CARD" && params.type === "CARD") {
					if (params.info.bank?.length && !params.info.bank.includes(item.info.bank)) return;
				}

				const itemPick = toItemRes(item, true);

				if (params.priceUp != null || params.priceDown != null) {
					const priceUp = params.priceUp ?? Infinity;
					const priceDown = params.priceDown ?? 0;

					if (el.price < priceDown || el.price > priceUp) return;
				}

				itemRes.push({
					id: el.id,
					name: el.name,
					desc: el.desc,
					price: el.price,
					status: el.status,

					sellerName: seller.nickname,
					sellerId: seller.id,
					sellerLike: 0,
					sellerDislike: 0,

					...itemPick,
				});
			});
		}

		return { returned: itemRes };
	}

	public async GET_ITEM(params: Interface.IGetItemReq) {
		const listing = this.module.listing.getListing(params.id);

		const item = this.module.item.getItemByListingId(listing.id, params.type);
		const seller = this.module.user.getUser(listing.sellerId);

		const itemPick = toItemRes(item, true);

		return {
			returned: {
				id: listing.id,
				name: listing.name,
				desc: listing.desc,
				price: listing.price,
				status: listing.status,

				sellerName: seller.nickname,
				sellerId: seller.id,
				sellerLike: 0,
				sellerDislike: 0,

				...itemPick,
			},
		};
	}
}

function toItemRes(item: ItemInterface.TItemAll, isPublicData: true): ItemInterface.TItemResPub;
function toItemRes(item: ItemInterface.TItemAll, isPublicData: boolean): ItemInterface.TItemResPub | ItemInterface.TItemRes {
	switch (item.type) {
		case "CARD": {
			const { id, listingId, name, ...rest } = item.info;
			const info = isPublicData ? rest : { name, ...rest };

			return { type: "CARD", info };
		}

		case "FREE": {
			const { id, listingId, desc, ...rest } = item.info;
			const info = isPublicData ? { desc, ...rest } : rest;

			return { type: "FREE", info };
		}
	}
}
