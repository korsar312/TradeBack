import { ErrorInterface } from "./../../../Utils/Error/Error.interface.ts";

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
		message: "Ошибка сервера",
	},
	ROUTE_NOT_FOUND: {
		httpCode: 404,
		message: "Маршрут не найден ",
	},
	PARAMS_NOT_VALID: {
		httpCode: 400,
		message: "Параметры запроса неверны",
	},
	USER_ALREADY_EXIST: {
		httpCode: 400,
		message: "Пользователь уже существует",
	},
	NOT_RIGHT: {
		httpCode: 403,
		message: "Нет прав для данного АПИ",
	},
	UNAUTHORIZE: {
		httpCode: 401,
		message: "Не авторизован",
	},
} as const;
