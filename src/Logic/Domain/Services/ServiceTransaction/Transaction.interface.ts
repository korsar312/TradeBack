export namespace TransactionInterface {
	export interface IAdapter {
		walletPlus(data: TTransactionParams): string;
		walletMinus(data: TTransactionParams): string;

		holdPlus(data: TTransactionParams): string;
		holdMinus(data: TTransactionParams): string;

		systemPlus(data: TTransactionParamsSys): string;
		systemMinus(data: TTransactionParamsSys): string;

		getLastUserTransaction(userId: string): string;
		userAccounting(userId: string): TTransactionSum;

		getBalanceTrans(id: string): TTransactionSum;
		removeTransaction(id: string): void;
	}

	/**
	 * Транзакция.
	 * Описывает движения средств пользователя.
	 */
	export interface ITransaction {
		/** уникальный номер */
		id: string;

		/** чей баланс изменяем */
		userId: string;

		/** для группировки операций */
		operationId: string;

		/** если связано с payment */
		paymentId: string | null;

		/** контур операций */
		type: ETransactionType;

		/** списываем или пополняем */
		direction: EDirection;

		/** баланс на момент операции */
		walletBeforeSnapshot: number;

		/** баланс после операции */
		walletAfterSnapshot: number;

		/** заморозка на момент операции */
		holdBeforeSnapshot: number;

		/** заморозка после операции */
		holdAfterSnapshot: number;

		/** какой счёт меняем */
		account: EAccount;

		/** число средств */
		amount: number;

		/** время создания */
		createdAt: number;
	}

	type TTransactionInner = Pick<ITransaction, "id" | "createdAt">;
	type TTransactionBalance = Pick<ITransaction, "walletBeforeSnapshot" | "walletAfterSnapshot" | "holdBeforeSnapshot" | "holdAfterSnapshot">;

	export type TTransactionMin = Omit<ITransaction, keyof TTransactionInner>;
	export type TTransactionWork = Omit<ITransaction, keyof TTransactionInner | keyof TTransactionBalance>;
	export type TTransactionPath = Pick<ITransaction, "type" | "direction" | "account">;
	export type TTransactionParams = Omit<TTransactionWork, keyof TTransactionPath>;
	export type TTransactionParamsSys = Omit<TTransactionParams, "userId">;

	export type TTransactionSum = {
		balance: number;
		hold: number;
	};

	export type ETransactionType = keyof typeof TransactionType;
	export type EAccount = keyof typeof TransactionAccount;
	export type EDirection = keyof typeof TransactionDirection;
}

/**
 * Тип транзакции.
 * Определяет, к какому классу относится движение средств.
 */
const TransactionType = {
	/** движение по балансу */
	WALLET: "WALLET",

	/** комиссия сервиса */
	FEE: "FEE",
} as const;

/**
 * Счёт транзакции.
 * Определяет, где учитываются средства.
 */
const TransactionAccount = {
	/** активный баланс */
	BALANCE: "BALANCE",

	/** замороженный баланс */
	HOLD: "HOLD",
} as const;

/**
 * Направление транзакции.
 */
const TransactionDirection = {
	/** пополнение */
	IN: "IN",

	/** списание */
	OUT: "OUT",
} as const;
