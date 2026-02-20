import dotenv from "dotenv";
dotenv.config();

export const Consts = {
	PORT: Number(process.env.PORT || 4000),
	FEE: Number(process.env.FEE || 5),
	BD_PATH: "./app.sqlite",
	SYSTEM_USER: "__systemUser__",
};
