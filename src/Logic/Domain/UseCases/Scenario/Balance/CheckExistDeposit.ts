import { UseCasesInterface as Interface } from "../../UseCases.interface";
import UseCasesBase from "../../UseCases.base";

class CheckExistDeposit extends UseCasesBase {
	invoke(_params: Interface.TCheckExistDepositReq, userId: string): Interface.TCheckExistDepositRes {
		const deposit = this.service.cashFlow.getActiveDeposit(userId);

		if (deposit) {
			const { timeStart, ...rest } = deposit;
			return { ...rest, serverTime: Number(new Date()) };
		}

		return false;
	}
}

export default CheckExistDeposit;
