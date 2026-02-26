import { UseCasesInterface as Interface } from "../UseCases.interface";
import UseCasesBase from "../UseCases.base";
import { Utils } from "../../../../Utils";

class WithdrawBalance extends UseCasesBase {
	async invoke(params: Interface.TWithdrawBalanceReq, userId: string, operationId: string): Interface.TWithdrawBalanceRes {
		const balanceUser = this.service.transaction.getBalanceTrans(userId);
		const fee = this.service.cashFlow.getCashoutFee();

		const fullPrice = params.amount + fee;
		const isAvailable = balanceUser.balance >= fullPrice;

		if (!isAvailable) throw Utils.error.createError({ reason: "NOT_ENOUGH_MONEY" });

		const usrTransId = this.service.transaction.walletOutMinus({ amount: fullPrice, paymentId: null, operationId, userId });
		const sysTransId = this.service.transaction.systemPlus({ amount: params.amount, paymentId: null, operationId });

		try {
			await this.service.cashFlow.withdraw(params.address, params.amount);
		} catch {
			this.service.transaction.removeTransaction(usrTransId);
			this.service.transaction.removeTransaction(sysTransId);
		}
	}
}

export default WithdrawBalance;
