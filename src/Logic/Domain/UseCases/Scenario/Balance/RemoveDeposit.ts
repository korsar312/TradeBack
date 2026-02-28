import { UseCasesInterface as Interface } from "../../UseCases.interface";
import UseCasesBase from "../../UseCases.base";

class CreateDeposit extends UseCasesBase {
	async invoke(_params: Interface.TRemoveDepositReq, userId: string): Interface.TRemoveDepositRes {
		this.service.cashFlow.removeDeposit(userId);

		return new Promise((resolve) => {
			this.depositAwaitMap.set(userId, [...(this.depositAwaitMap.get(userId) || []), () => resolve()]);
		});
	}
}

export default CreateDeposit;
