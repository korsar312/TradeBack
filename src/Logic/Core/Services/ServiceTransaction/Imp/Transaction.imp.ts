import type { TransactionInterface as Interface } from "../Transaction.interface.ts";
import ServiceBase from "../../Service.base";

class TransactionImp extends ServiceBase implements Interface.IAdapter {
	private CreatePayment(data: Interface.TTransactionMin): Interface.ITransaction {
		const id = "transaction__" + crypto.randomUUID();
		return { ...data, id, createdAt: new Date().getTime() };
	}

	private GetTransactionByUserId = (userId: string): Interface.ITransaction[] => this.API.BD.read.TransactionByUserId(userId);

	private HandlePayment(data: Interface.TTransactionParams, path: Interface.TTransactionPath): Interface.TTransactionSum {
		const beforeWallet: Interface.TTransactionSum = this.GetTransactionByUserId(data.userId).reduce((prev, cur) => this.CalcSum(cur, cur.amount, prev), {
			balance: 0,
			hold: 0,
		});

		const afterWallet: Interface.TTransactionSum = this.CalcSum(path, data.amount, beforeWallet);

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

	public walletOutPlus(data: Interface.TTransactionParams): Interface.TTransactionSum {
		const path: Interface.TTransactionPath = { type: "EXTERNAL", direction: "IN", account: "BALANCE" };
		return this.HandlePayment(data, path);
	}

	public walletOutMinus(data: Interface.TTransactionParams): Interface.TTransactionSum {
		const path: Interface.TTransactionPath = { type: "EXTERNAL", direction: "IN", account: "BALANCE" };
		return this.HandlePayment(data, path);
	}

	public walletInPlus(data: Interface.TTransactionParams): Interface.TTransactionSum {
		const path: Interface.TTransactionPath = { type: "EXTERNAL", direction: "IN", account: "BALANCE" };
		return this.HandlePayment(data, path);
	}

	public walletInMinus(data: Interface.TTransactionParams): Interface.TTransactionSum {
		const path: Interface.TTransactionPath = { type: "EXTERNAL", direction: "IN", account: "BALANCE" };
		return this.HandlePayment(data, path);
	}

	public holdPlus(data: Interface.TTransactionParams): Interface.TTransactionSum {
		const path: Interface.TTransactionPath = { type: "EXTERNAL", direction: "IN", account: "BALANCE" };
		return this.HandlePayment(data, path);
	}

	public holdMinus(data: Interface.TTransactionParams): Interface.TTransactionSum {
		const path: Interface.TTransactionPath = { type: "EXTERNAL", direction: "IN", account: "BALANCE" };
		return this.HandlePayment(data, path);
	}

	public systemPlus(data: Interface.TTransactionParams): Interface.TTransactionSum {
		const path: Interface.TTransactionPath = { type: "EXTERNAL", direction: "IN", account: "BALANCE" };
		return this.HandlePayment(data, path);
	}

	public systemMinus(data: Interface.TTransactionParams): Interface.TTransactionSum {
		const path: Interface.TTransactionPath = { type: "EXTERNAL", direction: "IN", account: "BALANCE" };
		return this.HandlePayment(data, path);
	}
}

export default TransactionImp;
