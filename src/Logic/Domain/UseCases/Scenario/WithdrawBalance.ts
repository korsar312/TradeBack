import { UseCasesInterface as Interface } from "../UseCases.interface";
import UseCasesBase from "../UseCases.base";

class WithdrawBalance extends UseCasesBase {
	async invoke(params: Interface.TWithdrawBalanceReq, userId: string): Interface.TWithdrawBalanceRes {
		const balance = this.service.transaction.userAccounting(userId);

		console.log(balance);

		//await this.service.cashFlow.withdraw(params.address, params.amount);
	}
}

export default WithdrawBalance;
