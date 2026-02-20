import type { WalletInterface as Interface } from "../Wallet.interface.ts";
import ServiceBase from "../../Service.base";
import { Utils } from "../../../../../Utils";

class WalletImp extends ServiceBase implements Interface.IAdapter {
	getUserWallet(userId: string) {
		const transaction = Utils.error.require(this.API.BD.read.Transaction(userId), "DEAL_NOT_FOUND");

		return { balance: transaction.walletAfterSnapshot, hold: transaction.holdAfterSnapshot };
	}
	getSystemMoney() {
		return 1;
	}
}

export default WalletImp;
