import { UseCasesInterface as Interface } from "../UseCases.interface";
import UseCasesBase from "../UseCases.base";

class WithdrawBalance extends UseCasesBase {
	async invoke(params: Interface.TWithdrawBalanceReq, userId: string): Interface.TWithdrawBalanceRes {
		const transId = this.service.transaction.walletOutMinus({ amount: params.amount, paymentId: null, userId });

		try {
			await this.service.cashFlow.withdraw(params.address, params.amount);
		} catch {
			this.service.transaction.removeTransaction(transId);
		}
	}
}

export default WithdrawBalance;
