import type { Request } from "express";
import type { z } from "zod";

export namespace ErrorInterface {
	export interface IAdapter {
		unknownError: TError;
		getError(params: TErrorReason): TError;
		createError(param: TErrorReason): TError;
		parseQuery<TSchema extends z.ZodType>(req: Request, schema: TSchema, userError?: EErrorReason): z.output<TSchema>;
	}

	export type TError = {
		message: string;
		httpCode: number;
		data?: unknown;
	};

	export type TErrorReason = {
		reason: string | keyof typeof ErrorReason;
		data?: string;
	};
	export type EErrorReason = keyof typeof ErrorReason;
	export type TErrorMap = Record<EErrorReason, Omit<TError, "data">>;
}

export const ErrorReason = {
	UNAUTHORIZED: "UNAUTHORIZED",
	AUTH_INVALID: "AUTH_INVALID",
	FORBIDDEN: "FORBIDDEN",
	PARAMS_NOT_VALID: "PARAMS_NOT_VALID",
	BAD_REQUEST: "BAD_REQUEST",
	VALIDATION_FAILED: "VALIDATION_FAILED",
	NOT_FOUND: "NOT_FOUND",
	ENTITY_NOT_FOUND: "ENTITY_NOT_FOUND",
	INVALID_STATE: "INVALID_STATE",
	CONFLICT: "CONFLICT",
	ALREADY_EXISTS: "ALREADY_EXISTS",
	NOT_ENOUGH_MONEY: "NOT_ENOUGH_MONEY",
	MONEY_TRANSFER_FAILED: "MONEY_TRANSFER_FAILED",
	NEGATIVE_TRANSACTION: "NEGATIVE_TRANSACTION",
	RATE_LIMITED: "RATE_LIMITED",
	TIMEOUT: "TIMEOUT",
	EXTERNAL_SERVICE_ERROR: "EXTERNAL_SERVICE_ERROR",
	DATABASE_ERROR: "DATABASE_ERROR",
	INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
} as const;
