import type { UserInterface as Interface } from "../User.interface.ts";
import ServiceBase from "../../Service.base";
import { UserNames } from "./User.names";
import { Utils } from "../../../../../Utils";

class UserImp extends ServiceBase implements Interface.IAdapter {
	private CreateUser(login: string): Interface.IUser {
		const id = "user__" + crypto.randomUUID();
		const nickname = UserNames[Math.floor(Math.random() * UserNames.length)];

		return { id, login, createdAt: new Date().getTime(), nickname, role: "USER" };
	}

	private CreateUserAuth(userId: string): Interface.IUserAuth {
		const id = "userAuth__" + crypto.randomUUID();
		const tokenHash = crypto.randomUUID();

		return { id, userId, tokenHash };
	}

	private GetUserAuth = (login: string): Interface.IUserAuth => Utils.error.require(this.API.BD.read.UsersAuthByLogin(login), "USER_NOT_FOUND");
	private IsExistUserAuth = (login: string): boolean => Boolean(this.API.BD.read.UsersAuthByLogin(login));
	private GetUser = (id: string): Interface.IUser => Utils.error.require(this.API.BD.read.User(id), "USER_NOT_FOUND");

	public saveNewUser(login: string) {
		if (this.IsExistUserAuth(login)) throw Utils.error.createError({ reason: "USER_ALREADY_EXIST" });

		const user = this.CreateUser(login);
		const auth = this.CreateUserAuth(user.id);

		this.API.BD.create.User(user);
		this.API.BD.create.UsersAuth(auth);

		return { user, auth };
	}

	public getUser(id: string): Interface.IUser {
		return this.GetUser(id);
	}

	public login(login: string, token: string): string {
		const authData = this.GetUserAuth(login);
		if (authData.tokenHash !== token) throw Utils.error.createError({ reason: "AUTH_INVALID" });

		const user = this.GetUser(authData.userId);

		return user.id;
	}
}

export default UserImp;
