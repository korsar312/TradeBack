import type { RestInterface as Interface } from "../Rest.interface.ts";
import { TModules } from "../../../Logic";
import { UseCasesInterface } from "../../../Logic/Domain/UseCases/UseCases.interface";

export class RestImp implements Interface.IAdapter {
	constructor(private readonly module: TModules) {}

	public LOGIN(params: UseCasesInterface.TLoginReq, userId: string) {
		return this.module.login(params, userId);
	}

	public REGISTER(params: UseCasesInterface.TRegisterReq, userId: string) {
		return this.module.register(params, userId);
	}

	public CREATE_LISTING(params: UseCasesInterface.TCreateListingReq, userId: string) {
		return this.module.createListing(params, userId);
	}

	public CREATE_LISTING_ARR(params: UseCasesInterface.TCreateListingReq[], userId: string) {
		params.forEach((el) => this.module.createListing(el, userId));
	}

	public GET_ITEMS(params: UseCasesInterface.TGetItemListReq, userId: string) {
		return this.module.getItemList(params, userId);
	}

	public GET_ITEM(params: UseCasesInterface.TGetItemReq, userId: string) {
		return this.module.getItem(params, userId);
	}

	public AWAIT_PAY_DEPOSIT(params: UseCasesInterface.TAwaitPayDepositReq, userId: string) {
		return this.module.awaitPayDeposit(params, userId);
	}

	public IS_EXIST_DEPOSIT(params: UseCasesInterface.TCheckExistDepositReq, userId: string) {
		return this.module.checkExistDeposit(params, userId);
	}

	public CREATE_DEPOSIT(params: UseCasesInterface.TCreateDepositReq, userId: string) {
		return this.module.createDeposit(params, userId);
	}

	public REMOVE_DEPOSIT(params: UseCasesInterface.TRemoveDepositReq, userId: string) {
		return this.module.removeDeposit(params, userId);
	}

	public GET_BALANCE(params: UseCasesInterface.TGetBalanceReq, userId: string) {
		return this.module.getBalance(params, userId);
	}

	public WITHDRAW_BALANCE(params: UseCasesInterface.TWithdrawBalanceReq, userId: string) {
		return this.module.withdrawBalance(params, userId);
	}
}
