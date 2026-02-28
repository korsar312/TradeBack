import type { ErrorInterface } from "../../../Utils/Error/Error.interface";

export const Errors: ErrorInterface.TErrorMap = {
	/**
	 * Auth / Access
	 */
	UNAUTHORIZED: { httpCode: 401, message: "Не авторизован" },
	AUTH_INVALID: { httpCode: 401, message: "Ошибка авторизации" },
	FORBIDDEN: { httpCode: 403, message: "Недостаточно прав" },

	/**
	 * Request / Validation
	 */
	PARAMS_NOT_VALID: { httpCode: 400, message: "Параметры запроса неверны" },
	BAD_REQUEST: { httpCode: 400, message: "Некорректный запрос" },
	VALIDATION_FAILED: { httpCode: 422, message: "Ошибка валидации" },

	/**
	 * Resource / Not found (абстрактно)
	 */
	NOT_FOUND: { httpCode: 404, message: "Ресурс не найден" },
	ENTITY_NOT_FOUND: { httpCode: 404, message: "Сущность не найдена" },

	/**
	 * State / Conflict (как INVALID_STATE)
	 */
	INVALID_STATE: { httpCode: 409, message: "Текущий статус не позволяет выполнить операцию" },
	CONFLICT: { httpCode: 409, message: "Конфликт состояния" },
	ALREADY_EXISTS: { httpCode: 409, message: "Сущность уже существует" },

	/**
	 * Money / Wallet
	 */
	NOT_ENOUGH_MONEY: { httpCode: 409, message: "Недостаточно средств" },
	MONEY_TRANSFER_FAILED: { httpCode: 502, message: "Ошибка при переводе денежных средств" },
	NEGATIVE_TRANSACTION: { httpCode: 422, message: "Транзакция нарушает инвариант баланса" },

	/**
	 * Rate / Limits / Timeouts (универсально)
	 */
	RATE_LIMITED: { httpCode: 429, message: "Слишком много запросов" },
	TIMEOUT: { httpCode: 504, message: "Превышено время ожидания" },

	/**
	 * Infrastructure / External
	 */
	EXTERNAL_SERVICE_ERROR: { httpCode: 502, message: "Ошибка внешнего сервиса" },
	DATABASE_ERROR: { httpCode: 500, message: "Ошибка базы данных" },

	/**
	 * Server
	 */
	INTERNAL_SERVER_ERROR: { httpCode: 500, message: "Ошибка сервера" },
} as const;
