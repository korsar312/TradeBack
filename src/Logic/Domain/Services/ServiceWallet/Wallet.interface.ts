import { PublicInterface } from "../Public.interface";

export namespace WalletInterface {
	export interface IAdapter {
		getUserWallet(userId: string): PublicInterface.TPublicMoney;
		getSystemMoney(): number;
	}
}
