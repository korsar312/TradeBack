export namespace TransactionInterface {
	export interface IAdapter {
		walletOutPlus(data: TTransactionParams): TTransactionSum;
		walletOutMinus(data: TTransactionParams): TTransactionSum;
		walletInPlus(data: TTransactionParams): TTransactionSum;
		walletInMinus(data: TTransactionParams): TTransactionSum;

		holdPlus(data: TTransactionParams): TTransactionSum;
		holdMinus(data: TTransactionParams): TTransactionSum;

		systemPlus(data: TTransactionParams): TTransactionSum;
		systemMinus(data: TTransactionParams): TTransactionSum;
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
	/** движение по внутреннему балансу */
	WALLET: "WALLET",

	/** вход/выход во внешний мир */
	EXTERNAL: "EXTERNAL",

	/** комиссия сервиса */
	FEE: "FEE",
} as const;

/**
 * Счёт транзакции.
 * Определяет, где учитываются средства.
 */
const TransactionAccount = {
	/** баланс */
	BALANCE: "BALANCE",

	/** заморозка */
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
