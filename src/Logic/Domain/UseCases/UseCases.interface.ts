import type { PublicInterface } from "../Services/Public.interface";
import type { ListingInterface } from "../Services/ServiceListing/Listing.interface";
import type { ItemInterface } from "../Services/ServiceItem/Item.interface";
import type { UserInterface } from "../Services/ServiceUser/User.interface";

export namespace UseCasesInterface {
	export type IAdapter = {};

	export type TScenarioList = {
		login: TScenarioBase<TLoginReq, TLoginRes>;
		register: TScenarioBase<TRegisterReq, TRegisterRes>;
		createListing: TScenarioBase<TCreateListingReq, TCreateListingRes>;
		getItemList: TScenarioBase<TGetItemListReq, TGetItemListRes>;
		getItem: TScenarioBase<TGetItemReq, TGetItemRes>;
	};

	export type TScenarioBase<T, R> = {
		invoke(params: T, userId: string): R;
	};

	//========================= REQ ==============================

	export type TLoginReq = {
		login: string;
		token: string;
	};

	export type TRegisterReq = {
		login: string;
	};

	export type TGetItemListReq = {
		limit: number;
		saleKind: ListingInterface.EListingSaleKind;
		cursorId?: string;
		sort?: PublicInterface.ESort;
		sellerId?: string;
		priceUp?: number;
		priceDown?: number;
		findStr?: string;
	} & ItemInterface.TItemReqPub;

	export type TGetItemReq = {
		id: string;
		type: ItemInterface.ETypeItem;
	};

	export type TCreateListingReq = {
		name: string;
		desc: string;
		price: number;
		saleKind: ListingInterface.EListingSaleKind;
	} & ItemInterface.TItemReq;

	//========================= RES ==============================

	export type TLoginRes = UserInterface.IUser;

	export type TRegisterRes = UserInterface.IUserAll;

	export type TGetItemListRes = Array<TGetItemRes>;

	export type TGetItemRes = {
		id: string;
		name: string;
		desc: string;
		price: number;
		status: ListingInterface.EListingStatus;

		sellerName: string;
		sellerId: string;
		sellerLike: number;
		sellerDislike: number;
	} & ItemInterface.TItemResPub;

	export type TCreateListingRes = string;
}
