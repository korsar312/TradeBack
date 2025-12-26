import dotenv from "dotenv";
dotenv.config();

export const Consts = {
	PORT: Number(process.env.PORT || 4000),
	BD_PATH: "./app.sqlite",
};
