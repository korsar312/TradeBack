import type { CashFlowInterface as Interface } from "../CashFlow.interface.ts";
import ServiceBase from "../../Service.base";

class CashFlowImp extends ServiceBase implements Interface.IAdapter {
	public async addUserMoney(amount: number) {
		return void amount;
	}

	public async missingUserMoney(amount: number) {
		return void amount;
	}
}

export default CashFlowImp;
