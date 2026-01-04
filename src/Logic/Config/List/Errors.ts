import { ErrorInterface } from "../../Core/Utils/Error/Error.interface.ts";

export const Errors: ErrorInterface.TErrorMap = {
	AUTH_INVALID: {
		httpCode: 401,
		message: "Ошибка авторизации",
	},
	USER_NOT_FOUND: {
		httpCode: 404,
		message: "Пользователь не найден",
	},
	INTERNAL_SERVER_ERROR: {
		httpCode: 500,
		message: "Ошибка ",
	},
	ROUTE_NOT_FOUND: {
		httpCode: 404,
		message: "Маршрут не найден ",
	},
};
