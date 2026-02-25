import type { TransactionInterface as Interface } from "../Transaction.interface.ts";
import ServiceBase, { type IServiceProps } from "../../Service.base";
import { Utils } from "../../../../../Utils";

class TransactionImp extends ServiceBase implements Interface.IAdapter {
	private CreatePayment(data: Interface.TTransactionMin): Interface.ITransaction {
		const id = "transaction__" + crypto.randomUUID();
		return { ...data, id, createdAt: new Date().getTime() };
	}

	private GetTransactionByUserId = (userId: string): Interface.ITransaction[] => this.API.BD.read.TransactionByUserId(userId);

	private HandlePayment(data: Interface.TTransactionParams, path: Interface.TTransactionPath): Interface.TTransactionSum {
		const userTrans = this.GetTransactionByUserId(data.userId);

		const beforeWallet: Interface.TTransactionSum = userTrans.reduce((prev, cur) => this.CalcSum(cur, cur.amount, prev), {
			balance: 0,
			hold: 0,
		});

		const afterWallet: Interface.TTransactionSum = this.CalcSum(path, data.amount, beforeWallet);

		if (Object.values(afterWallet).some((el) => el < 0)) {
			throw Utils.error.createError({ reason: "NEGATIVE_TRANSACTION", data: JSON.stringify({ beforeWallet, data }) });
		}

		const newTrans = this.CreatePayment({
			...data,
			...path,
			walletBeforeSnapshot: beforeWallet.balance,
			walletAfterSnapshot: afterWallet.balance,
			holdBeforeSnapshot: beforeWallet.hold,
			holdAfterSnapshot: afterWallet.hold,
		});

		this.API.BD.create.Transaction(newTrans);

		return afterWallet;
	}

	private CalcSum(path: Interface.TTransactionPath, amount: number, prevSum: Interface.TTransactionSum) {
		const sign = path.direction === "IN" ? 1 : -1;
		const sum = sign * amount;
		const field: keyof Interface.TTransactionSum = path.account === "BALANCE" ? "balance" : "hold";

		return { ...prevSum, [field]: prevSum[field] + sum };
	}

	//==============================================================================================

	constructor(
		props: IServiceProps,
		private readonly systemUser: string,
	) {
		super(props);
	}

	//==============================================================================================

	public walletOutPlus(data: Interface.TTransactionParams): Interface.TTransactionSum {
		return this.HandlePayment(data, { type: "EXTERNAL", direction: "IN", account: "BALANCE" });
	}

	public walletOutMinus(data: Interface.TTransactionParams): Interface.TTransactionSum {
		return this.HandlePayment(data, { type: "EXTERNAL", direction: "OUT", account: "BALANCE" });
	}

	public walletInPlus(data: Interface.TTransactionParams): Interface.TTransactionSum {
		return this.HandlePayment(data, { type: "WALLET", direction: "IN", account: "BALANCE" });
	}

	public walletInMinus(data: Interface.TTransactionParams): Interface.TTransactionSum {
		return this.HandlePayment(data, { type: "WALLET", direction: "OUT", account: "BALANCE" });
	}

	public hold(data: Interface.TTransactionParams): Interface.TTransactionSum {
		return this.HandlePayment(data, { type: "WALLET", direction: "IN", account: "HOLD" });
	}

	public unhold(data: Interface.TTransactionParams): Interface.TTransactionSum {
		return this.HandlePayment(data, { type: "WALLET", direction: "OUT", account: "HOLD" });
	}

	public systemPlus(data: Interface.TTransactionParamsSys): Interface.TTransactionSum {
		return this.HandlePayment({ ...data, userId: this.systemUser }, { type: "FEE", direction: "IN", account: "BALANCE" });
	}

	public systemMinus(data: Interface.TTransactionParamsSys): Interface.TTransactionSum {
		return this.HandlePayment({ ...data, userId: this.systemUser }, { type: "FEE", direction: "OUT", account: "BALANCE" });
	}

	public getLastUserTransaction(userId: string): Interface.TTransactionSum {
		const trans = this.API.BD.read.LastUserTransaction(userId);

		return { balance: trans?.walletAfterSnapshot || 0, hold: trans?.holdAfterSnapshot || 0 };
	}

	public userAccounting(userId: string): Interface.TTransactionSum {
		const trans = this.API.BD.read.TransactionByUserId(userId);

		return trans.reduce<Interface.TTransactionSum>(
			(prev, cur) => {
				const sign = cur.direction === "IN" ? 1 : -1;
				const delta = sign * cur.amount;

				if (cur.account === "BALANCE") return { ...prev, balance: prev.balance + delta };

				return { ...prev, hold: prev.hold + delta };
			},
			{ balance: 0, hold: 0 },
		);
	}
}

export default TransactionImp;
