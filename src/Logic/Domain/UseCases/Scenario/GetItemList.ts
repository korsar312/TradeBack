import { UseCasesInterface as Interface } from "../UseCases.interface";
import UseCasesBase from "../UseCases.base";

class GetItemList extends UseCasesBase<Interface.TGetItemListReq, Interface.TGetItemListRes> {
	invoke(params: Interface.TGetItemListReq): Interface.TGetItemListRes {
		const itemRes: Interface.TGetItemListRes = [];
		let lastListingId: string | undefined;

		while (itemRes.length < params.limit) {
			const reqQty = params.limit - itemRes.length;

			const listings = this.service.listing.getQtyListing(reqQty, "ACTIVE", params.saleKind, lastListingId || params.cursorId, {
				sort: params.sort,
				sellerId: params.sellerId,
				findStr: params.findStr,
			});

			if (listings.length === 0) break;
			lastListingId = listings.at(-1)?.id;

			listings.forEach((el) => {
				const item = this.service.item.getItemByListingId(el.id, params.type);
				const seller = this.service.user.getUser(el.sellerId);

				if (params.type !== item.type) return;

				if (item.type === "CARD" && params.type === "CARD") {
					if (params.info.bank?.length && !params.info.bank.includes(item.info.bank)) return;
				}

				const itemPick = this.toItemRes(item, true);

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

		return itemRes;
	}
}

export default GetItemList;
