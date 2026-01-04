import type { UserInterface as Interface } from "../User.interface.ts";
import ServiceBase from "../../Service.base.ts";
import { UserNames } from "./User.names.ts";
import { ErrorInterface } from "../../../Utils/Error/Error.interface.ts";

class UserImp extends ServiceBase implements Interface.IAdapter {
	private createUser(login: string): Interface.IUser {
		const id = "user__" + crypto.randomUUID();
		const nickname = UserNames[Math.floor(Math.random() * UserNames.length)];

		return { id, login, createdAt: new Date().valueOf(), nickname, role: "USER" };
	}

	private createUserAuth(userId: string): Interface.IUserAuth {
		const id = "userAuth__" + crypto.randomUUID();
		const tokenHash = crypto.randomUUID();

		return { id, userId, tokenHash };
	}

	private getAuthData(login: string): Interface.IUserAuth | null {
		return this.API.BD.read.UsersAuthByLogin(login);
	}

	public saveNewUser(login: string): string {
		const authData = this.getAuthData(login);

		if (authData) throw new Error("USER_ALREADY_EXIST" satisfies ErrorInterface.EErrorReason);

		const user = this.createUser(login);
		const auth = this.createUserAuth(user.id);

		this.API.BD.create.User(user);
		this.API.BD.create.UsersAuth(auth);

		return user.id;
	}

	public getUser(id: string): Interface.IUser | null {
		return this.API.BD.read.User(id);
	}

	public login(login: string, token: string): string {
		const authData = this.getAuthData(login);

		if (!authData || authData.tokenHash !== token) throw new Error("AUTH_INVALID" satisfies ErrorInterface.EErrorReason);

		const user = this.getUser(authData.userId);
		if (!user) throw new Error("USER_NOT_FOUND" satisfies ErrorInterface.EErrorReason);

		return user.id;
	}
}

export default UserImp;
