import { UseCasesInterface as Interface } from "../UseCases.interface";
import UseCasesBase from "../UseCases.base";

class CheckExistDeposit extends UseCasesBase {
	invoke(_params: Interface.TCheckExistDepositReq, userId: string): Interface.TCheckExistDepositRes {
		return this.service.cashFlow.getActiveDeposit(userId) || false;
	}
}

export default CheckExistDeposit;
