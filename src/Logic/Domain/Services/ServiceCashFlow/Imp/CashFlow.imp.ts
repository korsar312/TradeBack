import type { CashFlowInterface as Interface } from "../CashFlow.interface.ts";
import ServiceBase, { type IServiceProps } from "../../Service.base";
import { TronWeb } from "tronweb";
import { Utils } from "../../../../../Utils";
import Libs from "../../../../Libs";

class CashFlowImp extends ServiceBase implements Interface.IAdapter {
	private userPayList: Map<string, Interface.TDeposit> = new Map();
	private reservedAmounts: Set<number> = new Set();

	private CreateTron(privateKey?: string) {
		return new TronWeb({
			fullNode: "https://api.trongrid.io",
			solidityNode: "https://api.trongrid.io",
			privateKey,
		});
	}

	private async CreateUniqSum(baseAmount: number): Promise<number> {
		const STEP = 1;
		const MAX_VARIANTS = 1000;

		const base = Math.round(baseAmount * 100);

		while (true) {
			for (let i = 0; i < MAX_VARIANTS; i++) {
				const candidateCents = base + STEP * i;
				const candidate = Number((candidateCents / 100).toFixed(2));

				const isBusy = this.reservedAmounts.has(candidate) || Array.from(this.userPayList.values()).some((dep) => dep.amount === candidate);

				if (!isBusy) {
					this.reservedAmounts.add(candidate);
					return candidate;
				}
			}

			await Libs.delay(5000);
		}
	}

	//==============================================================================================

	constructor(
		props: IServiceProps,
		private readonly systemWalletData: Interface.TWallet,
		private readonly contractUSDT: string,
		private readonly timeOutPay: number,
		private readonly cashoutFee: number,
	) {
		super(props);
	}

	//==============================================================================================

	public async createDeposit(userId: string, amount: number): Promise<Interface.TDeposit> {
		const uniqSum = await this.CreateUniqSum(amount);

		const stratDate = Number(new Date());
		const endDate = stratDate + this.timeOutPay * 1000;

		const payContract: Interface.TDeposit = {
			address: this.systemWalletData.address,
			amount: uniqSum,
			timeStart: stratDate,
			timeEnd: endDate,
		};

		this.userPayList.set(userId, payContract);
		this.reservedAmounts.delete(uniqSum);

		return payContract;
	}

	public removeDeposit(userId: string): void {
		this.userPayList.delete(userId);
	}

	public async awaitPay(userId: string): Promise<boolean> {
		const contract = Utils.error.require(this.getActiveDeposit(userId), "ENTITY_NOT_FOUND");

		while (true) {
			await Libs.delay(5000);

			try {
				const isPaySuccess = await this.checkTransaction(contract);
				if (isPaySuccess) return true;
			} catch {}

			if (Number(new Date()) > contract.timeEnd || !this.getActiveDeposit(userId)) return false;
		}
	}

	public getActiveDeposit(userId: string): Interface.TDeposit | null {
		return this.userPayList.get(userId) || null;
	}

	public async checkTransaction(deposit: Interface.TDeposit) {
		const { timeStart, amount, address } = deposit;

		try {
			const url = `https://api.trongrid.io/v1/accounts/${address}/transactions/trc20?min_timestamp=${timeStart}&contract_address=${this.contractUSDT}`;

			const response = await fetch(url);
			const result = await response.json();

			const match = result.data.find((tx: any) => {
				const sumTrans = parseInt(tx.value) / 1000000;
				const isToAddress = tx.to === address;
				const isUsdt = tx.token_info?.address === this.contractUSDT;
				const isAfterTime = tx.block_timestamp >= timeStart;
				const isCorrectSum = amount === sumTrans;

				return isToAddress && isUsdt && isAfterTime && isCorrectSum;
			});

			return Boolean(match);
		} catch (e) {
			throw Utils.error.createError({ reason: "INTERNAL_SERVER_ERROR" });
		}
	}

	public async sendUSDT(privateKey: string, toAddress: string, amount: number) {
		try {
			const tronWeb = this.CreateTron(privateKey);
			const contract = await tronWeb.contract().at(this.contractUSDT);
			const amountInSun = tronWeb.BigNumber(amount).multipliedBy(tronWeb.toBigNumber(10).pow(6)).toFixed(0);

			return await contract.transfer(toAddress, amountInSun).send({ shouldPollResponse: true });
		} catch (e) {
			throw Utils.error.createError({ reason: "MONEY_TRANSFER_FAILED" });
		}
	}

	public withdraw(toAddress: string, amount: number): Promise<Interface.TDeposit> {
		return this.sendUSDT(this.systemWalletData.privateKey, toAddress, amount);
	}

	public getCashoutFee(): number {
		return this.cashoutFee;
	}

	public async createWallet(): Promise<Interface.TWallet> {
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

	public async checkMoneyWallet(address: string, type: Interface.EMoneyType): Promise<number> {
		try {
			const tronWeb = this.CreateTron();
			tronWeb.setAddress(this.contractUSDT);

			let amount = 0;

			switch (type) {
				case "USDT":
					const contract = await tronWeb.contract().at(this.contractUSDT);
					const result = await contract.balanceOf(address).call();
					amount = Number(result.toString());
					break;

				case "TRX":
					const balance = await tronWeb.trx.getBalance(address); // возвращает баланс в SUN (1 TRX = 1_000_000 SUN)
					amount = balance / 1_000_000; // преобразуем из SUN в TRX
					break;
			}

			return amount;
		} catch (e) {
			throw Utils.error.createError({ reason: "INTERNAL_SERVER_ERROR" });
		}
	}
}

export default CashFlowImp;
