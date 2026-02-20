import { UseCasesInterface as Interface } from "../UseCases.interface";
import UseCasesBase from "../UseCases.base";

class Register extends UseCasesBase<Interface.TRegisterReq, Interface.TRegisterRes> {
	invoke(params: Interface.TRegisterReq): Interface.TRegisterRes {
		const { login } = params;

		return this.service.user.saveNewUser(login);
	}
}

export default Register;
