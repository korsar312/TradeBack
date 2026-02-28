import { UseCasesInterface as Interface } from "../../UseCases.interface";
import UseCasesBase from "../../UseCases.base";

class GetBalance extends UseCasesBase {
	invoke(_params: Interface.TGetBalanceReq, userId: string): Interface.TGetBalanceRes {
		try {
			const transId = this.service.transaction.getLastUserTransaction(userId);

			return this.service.transaction.getBalanceTrans(transId);
		} catch {
			return { balance: 0, hold: 0 };
		}
	}
}

export default GetBalance;
