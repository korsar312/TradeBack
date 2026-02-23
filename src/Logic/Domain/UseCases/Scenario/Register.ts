import { UseCasesInterface as Interface } from "../UseCases.interface";
import UseCasesBase from "../UseCases.base";

class Register extends UseCasesBase {
	invoke(params: Interface.TRegisterReq): Interface.TRegisterRes {
		return this.service.user.saveNewUser(params.login);
	}
}

export default Register;
