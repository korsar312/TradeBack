import type { RestInterface as Interface } from "../Rest.interface.ts";
import { TModules } from "../../../Logic";
import { UseCasesInterface } from "../../../Logic/Domain/UseCases/UseCases.interface";

export class RestImp implements Interface.IAdapter {
	constructor(private readonly module: TModules) {}

	public async LOGIN(params: UseCasesInterface.TLoginReq, userId: string) {
		return this.module.login(params, userId);
	}

	public async REGISTER(params: UseCasesInterface.TRegisterReq, userId: string) {
		return this.module.register(params, userId);
	}

	public async CREATE_LISTING(params: UseCasesInterface.TCreateListingReq, userId: string) {
		return this.module.createListing(params, userId);
	}

	public async CREATE_LISTING_ARR(params: UseCasesInterface.TCreateListingReq[], userId: string) {
		params.forEach((el) => this.module.createListing(el, userId));
	}

	public async GET_ITEMS(params: UseCasesInterface.TGetItemListReq, userId: string) {
		return this.module.getItemList(params, userId);
	}

	public async GET_ITEM(params: UseCasesInterface.TGetItemReq, userId: string) {
		return this.module.getItem(params, userId);
	}
}
