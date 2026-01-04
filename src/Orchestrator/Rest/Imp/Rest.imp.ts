import { RestInterface as Interface } from "../Rest.interface.ts";
import { TModules } from "../../../Logic";
import { RestSchema } from "./Rest.schema.ts";
import { Utils } from "../../../Logic/Core/Utils";

export class RestImp implements Interface.IAdapter {
	constructor(private readonly module: TModules) {}

	public async LOGIN(params: Interface.TLoginReq) {
		const { login, token } = Utils.error.parseQuery(params, RestSchema.login);

		return { returned: this.module.User.login(login, token) };
	}
	public async GET_GOODS(params: {}) {}
	public async GET_ITEM(params: {}) {}
	public async GET_ITEM_DETAIL(params: {}) {}
	public async GET_ORDERS(params: {}) {}
	public async GET_ORDER_DETAIL(params: {}) {}
}
