import { UseCasesInterface as Interface } from "../UseCases.interface";
import UseCasesBase from "../UseCases.base";

class GetBalance extends UseCasesBase {
	invoke(_params: Interface.TGetBalanceReq, userId: string): Interface.TGetBalanceRes {
		return this.service.transaction.getLastUserTransaction(userId);
	}
}

export default GetBalance;
