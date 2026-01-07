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

	public async CREATE_LISTING(params: Interface.TSellsItemReq, userId: string) {
		console.log(userId);
	}

	public async GET_GOODS(params: {}) {}
	public async GET_ITEM(params: {}) {}
	public async GET_ITEM_DETAIL(params: {}) {}
	public async GET_ORDERS(params: {}) {}
	public async GET_ORDER_DETAIL(params: {}) {}
}
