type TOptions = {
	cent?: boolean;
	noSymbol?: boolean;
};

/**
 * В денежный формат
 */
export class ToMoney {
	static execute() {
		return function (value: string | number = 0, options?: TOptions) {
			const money = +value;

			const moneyType = new Intl.NumberFormat("ru-RU", {
				style: options?.noSymbol ? "decimal" : "currency",
				currency: "RUB",
				currencyDisplay: "symbol",
				minimumFractionDigits: options?.cent ? 0 : 2,
				maximumFractionDigits: 2,
			});

			return moneyType.format(money);
		};
	}
}
