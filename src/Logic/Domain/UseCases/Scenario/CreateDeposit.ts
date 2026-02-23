import { UseCasesInterface as Interface } from "../UseCases.interface";
import UseCasesBase from "../UseCases.base";
import { Utils } from "../../../../Utils";

class CreateDeposit extends UseCasesBase {
	async invoke(params: Interface.TCreateDepositReq, userId: string): Interface.TCreateDepositRes {
		if (this.service.cashFlow.getActiveDeposit(userId)) throw Utils.error.createError({ reason: "CONTRACT_DEPOSIT_ALREADY_EXIST" });

		const deposit = await this.service.cashFlow.createDeposit(userId, params.amount);
		this.depositAwaitMap.set(userId, []);

		this.service.cashFlow
			.awaitPay(userId)
			.then(() => {
				this.service.transaction.walletInPlus({ userId, amount: params.amount, paymentId: null });
				this.depositAwaitMap.get(userId)?.forEach((el) => el(true));
			})
			.catch((e) => this.depositAwaitMap.get(userId)?.forEach((el) => el(Boolean(e))))
			.finally(() => {
				this.service.cashFlow.removeDeposit(userId);
				this.depositAwaitMap.delete(userId);
			});

		return deposit;
	}
}

export default CreateDeposit;
