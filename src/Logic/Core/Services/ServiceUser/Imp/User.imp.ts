import type { UserInterface as Interface } from "../User.interface.ts";
import ServiceBase from "../../Service.base.ts";

class UserImp extends ServiceBase implements Interface.IAdapter {
	private createUser(login: string): Interface.IUser {
		return {
			id: `user${1}`,
			login,
			createdAt: new Date().valueOf(),
			nickname: "утка",
		};
	}

	private getAuth(login: string): Interface.IUser {
		return {
			id: `user${1}`,
			login,
			createdAt: new Date().valueOf(),
			nickname: "утка",
		};
	}

	public saveNewUser(login: string): string {
		const user = this.createUser(login);
		this.API.BD.create.user(user);

		return user.id;
	}

	public getUser(id: string): Interface.IUser | null {
		return this.API.BD.read.user(id);
	}

	public login(login: string, token: string): string {
		const user = "";
		return "";
	}
}

export default UserImp;
