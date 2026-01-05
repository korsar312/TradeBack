export namespace ChatInterface {
	export interface IAdapter {
		createChat(data: TChat): void;
	}

	export type TChat = {};
	export type TChatUser = {};
}
