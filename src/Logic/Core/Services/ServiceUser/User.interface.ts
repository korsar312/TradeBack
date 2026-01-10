export namespace UserInterface {
	export interface IAdapter {
		saveNewUser(login: string): { user: IUser; auth: IUserAuth };
		getUser(id: string): IUser;
		login(login: string, token: string): string;
	}

	export interface IUser {
		id: string; // id пользователя
		nickname: string; // никнейм
		role: ERole; // роль (ADMIN)
		login: string; // логин (unique)
		createdAt: number; // timestamp (INTEGER)
	}

	export interface IUserAuth {
		id: string; // id записи аутентификации
		userId: string; // FK users.id (unique => 1↔1)
		tokenHash: string; // хеш токена/пароля
	}

	export interface IUserRestriction {
		id: string; // id ограничения
		userId: string; // кому выдано (FK users.id)
		type: ERestriction; // тип ограничения
		untilTs: number; // до какого времени действует
		reason: string; // причина
		byId: string | null; // кто выдал (может быть "U_ADMIN")
		createdAt: number; // когда выдано
	}

	export type ERestriction = keyof typeof UserRestriction;
	export type ERole = keyof typeof UserRole;
}

const UserRestriction = {
	CHAT: "CHAT",
	SELL: "SELL",
	BUY: "BUY",
	WITHDRAW: "WITHDRAW",
};

export const UserRole = {
	ADMIN: "ADMIN",
	USER: "USER",
};
