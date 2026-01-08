import type { UserInterface as Interface } from "../User.interface.ts";
import ServiceBase from "../../Service.base.ts";
import { UserNames } from "./User.names.ts";
import type { ErrorInterface } from "../../../../../Utils/Error/Error.interface.ts";

class UserImp extends ServiceBase implements Interface.IAdapter {
	private Require<T>(value: T | null | undefined, reason: ErrorInterface.EErrorReason): T {
		if (value == null) throw new Error(reason satisfies ErrorInterface.EErrorReason);
		return value;
	}

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

	private GetUserAuth = (login: string): Interface.IUserAuth => this.Require(this.API.BD.read.UsersAuthByLogin(login), "USER_NOT_FOUND");
	private IsExistUserAuth = (login: string): boolean => Boolean(this.API.BD.read.UsersAuthByLogin(login));

	private GetUser = (id: string): Interface.IUser => this.Require(this.API.BD.read.User(id), "USER_NOT_FOUND");
	private IsExistUser = (id: string): boolean => Boolean(this.API.BD.read.User(id));

	public saveNewUser(login: string): string {
		if (this.IsExistUserAuth(login)) throw new Error("USER_ALREADY_EXIST" satisfies ErrorInterface.EErrorReason);

		const user = this.CreateUser(login);
		const auth = this.CreateUserAuth(user.id);

		this.API.BD.create.User(user);
		this.API.BD.create.UsersAuth(auth);

		return user.id;
	}

	public getUser(id: string): Interface.IUser {
		return this.GetUser(id);
	}

	public login(login: string, token: string): string {
		const authData = this.GetUserAuth(login);
		if (authData.tokenHash !== token) throw new Error("AUTH_INVALID" satisfies ErrorInterface.EErrorReason);

		const user = this.GetUser(authData.userId);

		return user.id;
	}
}

export default UserImp;
