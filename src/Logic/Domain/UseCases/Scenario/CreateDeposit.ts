import { UseCasesInterface as Interface } from "../UseCases.interface";
import UseCasesBase from "../UseCases.base";

class CreateDeposit extends UseCasesBase<Interface.TStartDepositReq, Interface.TStartDepositRes> {
	invoke(params: Interface.TStartDepositReq): Interface.TStartDepositRes {
		return false;
	}
}

export default CreateDeposit;
