import { UseCasesInterface as Interface } from "../UseCases.interface";
import UseCasesBase from "../UseCases.base";

class Login extends UseCasesBase<Interface.TLoginReq, Interface.TLoginRes> {
	invoke(params: Interface.TLoginReq): Interface.TLoginRes {
		const { login, token } = params;

		const userId = this.service.user.login(login, token);

		return this.service.user.getUser(userId);
	}
}

export default Login;
