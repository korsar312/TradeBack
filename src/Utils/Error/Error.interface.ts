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
	NOT_RIGHT: "NOT_RIGHT",
	UNAUTHORIZE: "UNAUTHORIZE",
	AUTH_INVALID: "AUTH_INVALID",
	USER_NOT_FOUND: "USER_NOT_FOUND",
	DEAL_NOT_FOUND: "DEAL_NOT_FOUND",
	DELIVERY_NOT_FOUND: "DELIVERY_NOT_FOUND",
	EVALUATION_NOT_FOUND: "EVALUATION_NOT_FOUND",
	MESSAGE_NOT_FOUND: "MESSAGE_NOT_FOUND",
	PAYMENT_NOT_FOUND: "PAYMENT_NOT_FOUND",
	ITEM_NOT_FOUND: "ITEM_NOT_FOUND",
	CHAT_NOT_FOUND: "CHAT_NOT_FOUND",
	ROUTE_NOT_FOUND: "ROUTE_NOT_FOUND",
	PARAMS_NOT_VALID: "PARAMS_NOT_VALID",
	USER_ALREADY_EXIST: "USER_ALREADY_EXIST",
	ITEM_TYPE_NOT_FOUND: "ITEM_TYPE_NOT_FOUND",
	INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
} as const;
