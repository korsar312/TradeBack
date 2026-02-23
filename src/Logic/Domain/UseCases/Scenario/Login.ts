import { UseCasesInterface as Interface } from "../UseCases.interface";
import UseCasesBase from "../UseCases.base";

class Login extends UseCasesBase {
	invoke(params: Interface.TLoginReq): Interface.TLoginRes {
		const userId = this.service.user.login(params.login, params.token);

		return this.service.user.getUser(userId);
	}
}

export default Login;
