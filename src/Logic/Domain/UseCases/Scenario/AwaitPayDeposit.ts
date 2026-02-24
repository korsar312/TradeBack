import { UseCasesInterface as Interface } from "../UseCases.interface";
import UseCasesBase from "../UseCases.base";
import { Utils } from "../../../../Utils";

class AwaitPayDeposit extends UseCasesBase {
	async invoke(_params: Interface.TAwaitPayDepositReq, userId: string): Interface.TAwaitPayDepositRes {
		if (!this.depositAwaitMap.has(userId)) throw Utils.error.createError({ reason: "CONTRACT_DEPOSIT_NOT_FOUND" });

		return new Promise((resolve) => {
			this.depositAwaitMap.set(userId, [...(this.depositAwaitMap.get(userId) || []), (e) => resolve(e)]);
		});
	}
}

export default AwaitPayDeposit;
