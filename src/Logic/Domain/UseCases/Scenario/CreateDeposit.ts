import { UseCasesInterface as Interface } from "../UseCases.interface";
import UseCasesBase from "../UseCases.base";
import { Utils } from "../../../../Utils";

class CreateDeposit extends UseCasesBase {
	async invoke(params: Interface.TCreateDepositReq, userId: string, operationId: string): Interface.TCreateDepositRes {
		if (this.service.cashFlow.getActiveDeposit(userId)) throw Utils.error.createError({ reason: "CONTRACT_DEPOSIT_ALREADY_EXIST" });

		const deposit = await this.service.cashFlow.createDeposit(userId, params.amount);
		this.depositAwaitMap.set(userId, []);

		this.service.cashFlow
			.awaitPay(userId)
			.then((isSuccess: boolean) => {
				if (isSuccess) {
					this.service.transaction.walletInPlus({ userId, amount: params.amount, paymentId: null, operationId });
					this.depositAwaitMap.get(userId)?.forEach((el) => el(true));
				} else {
					this.depositAwaitMap.get(userId)?.forEach((el) => el(false));
				}
			})
			.finally(() => {
				this.service.cashFlow.removeDeposit(userId);
				this.depositAwaitMap.delete(userId);
			});

		const { timeStart, ...rest } = deposit;

		return { ...rest, serverTime: Number(new Date()) };
	}
}

export default CreateDeposit;
