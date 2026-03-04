import type { CashFlowInterface } from "../Services/ServiceCashFlow/CashFlow.interface";
import type { ListingInterface } from "../Services/ServiceListing/Listing.interface";
import type { PublicInterface } from "../Services/Public.interface";
import { UserInterface } from "../Services/ServiceUser/User.interface";
import type { ItemInterface } from "../Services/ServiceItem/Item.interface";
import { TransactionInterface } from "../Services/ServiceTransaction/Transaction.interface";
import { DealInterface } from "../Services/ServiceDeal/Deal.interface";
import { PaymentInterface } from "../Services/ServicePayment/Payment.interface";

export namespace UseCasesInterface {
	export type IAdapter = {};

	export type TScenarioList = {
		login: TScenarioBase<TLoginReq, TLoginRes>;
		register: TScenarioBase<TRegisterReq, TRegisterRes>;
		createListing: TScenarioBase<TCreateListingReq, TCreateListingRes>;
		getItemList: TScenarioBase<TGetItemListReq, TGetItemListRes>;
		getItem: TScenarioBase<TGetItemReq, TGetItemRes>;
		checkExistDeposit: TScenarioBase<TCheckExistDepositReq, TCheckExistDepositRes>;
		createDeposit: TScenarioBase<TCreateDepositReq, TCreateDepositRes>;
		awaitPayDeposit: TScenarioBase<TAwaitPayDepositReq, TAwaitPayDepositRes>;
		removeDeposit: TScenarioBase<TRemoveDepositReq, TRemoveDepositRes>;
		getBalance: TScenarioBase<TGetBalanceReq, TGetBalanceRes>;
		withdrawBalance: TScenarioBase<TWithdrawBalanceReq, TWithdrawBalanceRes>;
		startBuyItem: TScenarioBase<TStartBuyItemReq, TStartBuyItemRes>;
		getOrderList: TScenarioBase<TGetOrderListReq, TGetOrderListRes>;
		getOrder: TScenarioBase<TGetOrderReq, TGetOrderRes>;
	};

	export type TScenarioBase<T, R> = {
		invoke(params: T, userId: string, operationId: string): R;
	};

	type TGetListingBase = {
		id: string;
		name: string;
		desc: string;
		price: number;
		status: ListingInterface.EListingStatus;

		sellerName: string;
		sellerId: string;
		sellerLike: number;
		sellerDislike: number;
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

	export type TCreateDepositReq = {
		amount: number;
	};

	export type TCheckExistDepositReq = void;

	export type TAwaitPayDepositReq = void;

	export type TRemoveDepositReq = void;

	export type TGetBalanceReq = void;

	export type TWithdrawBalanceReq = { address: string; amount: number };

	export type TStartBuyItemReq = { listingId: string };

	export type TGetOrderReq = { dealId: string };

	export type TGetOrderListReq = {
		isActive: boolean;
		isSell: boolean;
		limit: number;
		cursorId?: string;
	};

	//========================= RES ==============================

	export type TLoginRes = UserInterface.IUser;

	export type TRegisterRes = UserInterface.IUserAll;

	export type TGetItemListRes = Array<TGetItemRes>;

	export type TGetItemRes = TGetListingBase & ItemInterface.TItemResPub;

	export type TCreateListingRes = string;

	export type TCreateDepositRes = Promise<Omit<CashFlowInterface.TDeposit, "timeStart"> & { serverTime: number }>;

	export type TCheckExistDepositRes = (Omit<CashFlowInterface.TDeposit, "timeStart"> & { serverTime: number }) | false;

	export type TAwaitPayDepositRes = Promise<boolean>;

	export type TRemoveDepositRes = Promise<void>;

	export type TGetBalanceRes = TransactionInterface.TTransactionSum;

	export type TWithdrawBalanceRes = Promise<void>;

	export type TStartBuyItemRes = void;

	export type TGetOrderRes = {
		listing: ListingInterface.IListing;
		deal: DealInterface.IDeal;
		seller: UserInterface.TUserMin;
		payment: PaymentInterface.IPayment;
		buyer: UserInterface.TUserMin;
		item: ItemInterface.TItemAll;
	};

	export type TGetOrderListRes = Array<TGetOrderRes>;
}
