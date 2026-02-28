import type { RestInterface as Interface } from "../Rest.interface.ts";
import { TModules } from "../../../Logic";
import { UseCasesInterface } from "../../../Logic/Domain/UseCases/UseCases.interface";

export class RestImp implements Interface.IAdapter {
	private handlerRest<P, R>(fn: () => (params: P, userId: string, operationId: string) => R) {
		return (params: P, userId: string): R => {
			const operationId = "rest__" + crypto.randomUUID();
			const initFn = fn();

			return initFn(params, userId, operationId);
		};
	}

	//==============================================================================================

	constructor(private readonly module: TModules) {}

	public LOGIN = this.handlerRest(() => this.module.login);
	public REGISTER = this.handlerRest(() => this.module.register);
	public CREATE_LISTING = this.handlerRest(() => this.module.createListing);
	public GET_ITEMS = this.handlerRest(() => this.module.getItemList);
	public GET_ITEM = this.handlerRest(() => this.module.getItem);
	public AWAIT_PAY_DEPOSIT = this.handlerRest(() => this.module.awaitPayDeposit);
	public IS_EXIST_DEPOSIT = this.handlerRest(() => this.module.checkExistDeposit);
	public CREATE_DEPOSIT = this.handlerRest(() => this.module.createDeposit);
	public REMOVE_DEPOSIT = this.handlerRest(() => this.module.removeDeposit);
	public GET_BALANCE = this.handlerRest(() => this.module.getBalance);
	public WITHDRAW_BALANCE = this.handlerRest(() => this.module.withdrawBalance);
	public START_BUY_ITEM = this.handlerRest(() => this.module.startBuyItem);

	public CREATE_LISTING_ARR(params: UseCasesInterface.TCreateListingReq[], userId: string) {
		params.forEach((el) => this.handlerRest(() => this.module.createListing)(el, userId));
	}
}
