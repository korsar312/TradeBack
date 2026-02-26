import dotenv from "dotenv";
dotenv.config();

export const Consts = {
	PORT: Number(process.env.PORT || 4000),

	TRADE_FEE: 5,
	CASHOUT_FEE: 2,

	BD_PATH: "./app.sqlite".trim(),
	SYSTEM_USER: "__systemUser__".trim(),

	PRIVATE_KEY_WALLET: (process.env.PRIVATE_KEY_WALLET || "").trim(),
	PUBLIC_KEY_WALLET: (process.env.PUBLIC_KEY_WALLET || "").trim(),
	ADDRESS_WALLET: (process.env.ADDRESS_WALLET || "").trim(),

	CONTRACT_USDT: "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t".trim(),
	PAY_AWAIT_TIME: 20,
};
