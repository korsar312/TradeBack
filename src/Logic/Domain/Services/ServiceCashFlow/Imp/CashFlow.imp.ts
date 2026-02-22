import type { CashFlowInterface as Interface } from "../CashFlow.interface.ts";
import ServiceBase, { type IServiceProps } from "../../Service.base";
import { TronWeb } from "tronweb";
import { Utils } from "../../../../../Utils";

class CashFlowImp extends ServiceBase implements Interface.IAdapter {
	private CreateTron(privateKey?: string) {
		return new TronWeb({
			fullNode: "https://api.trongrid.io",
			solidityNode: "https://api.trongrid.io",
			privateKey,
		});
	}

	//==============================================================================================

	constructor(
		props: IServiceProps,
		private readonly systemWalletData: Interface.TWallet,
		private readonly contractUSDT: string,
	) {
		super(props);
	}

	//==============================================================================================

	public async createWallet() {
		try {
			const tronWeb = this.CreateTron();
			const account = await tronWeb.createAccount();

			return {
				address: account.address.base58,
				privateKey: account.privateKey,
				publicKey: account.publicKey,
			};
		} catch (e) {
			throw Utils.error.createError({ reason: "INTERNAL_SERVER_ERROR" });
		}
	}

	public getWalletAddress() {
		return this.systemWalletData.address;
	}

	public async checkUSDT(address: string) {
		try {
			const tronWeb = this.CreateTron();
			tronWeb.setAddress(this.contractUSDT);

			const contract = await tronWeb.contract().at(this.contractUSDT);
			const result = await contract.balanceOf(address).call();

			return Number(result.toString());
		} catch (e: any) {
			throw Utils.error.createError({ reason: "INTERNAL_SERVER_ERROR" });
		}
	}

	public async checkTrx(address: string) {
		try {
			const tronWeb = this.CreateTron();
			tronWeb.setAddress(this.contractUSDT);

			const balance = await tronWeb.trx.getBalance(address); // возвращает баланс в SUN (1 TRX = 1_000_000 SUN)

			return balance / 1_000_000; // преобразуем из SUN в TRX
		} catch (e) {
			throw Utils.error.createError({ reason: "INTERNAL_SERVER_ERROR" });
		}
	}

	public getActiveDeposit(id: string) {
		return null;
	}

	public async createDeposit() {
		return {
			address: "string",
			timeOut: 4,
			amount: 4,
		};
	}

	public async checkTransaction(address: string, minTimestamp: string, sum: string, timeChecking: number) {
		return false;
	}

	public async sendUSDT(privateKey: string, toAddress: string, amount: number) {
		return true;
	}
}

export default CashFlowImp;
