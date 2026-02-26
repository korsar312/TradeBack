import { UseCasesInterface as Interface } from "../UseCases.interface";
import UseCasesBase from "../UseCases.base";

class GetBalance extends UseCasesBase {
	invoke(_params: Interface.TGetBalanceReq, userId: string): Interface.TGetBalanceRes {
		const transId = this.service.transaction.getLastUserTransaction(userId);

		return this.service.transaction.getBalanceTrans(transId);
	}
}

export default GetBalance;
