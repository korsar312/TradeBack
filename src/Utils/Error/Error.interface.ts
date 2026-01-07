import type { Request } from "express";
import type { z } from "zod";

export namespace ErrorInterface {
	export interface IAdapter {
		getError(innerReason: EErrorReason): TError;
		parseQuery<TSchema extends z.ZodType>(req: Request, schema: TSchema, userError?: EErrorReason): z.output<TSchema>;
	}

	export type TError = {
		message: string;
		httpCode: number;
	};

	export type EErrorReason = keyof typeof ErrorReason;
	export type TErrorMap = Record<EErrorReason, TError>;
}

export const ErrorReason = {
	NOT_RIGHT: "NOT_RIGHT",
	UNAUTHORIZE: "UNAUTHORIZE",
	AUTH_INVALID: "AUTH_INVALID",
	USER_NOT_FOUND: "USER_NOT_FOUND",
	ROUTE_NOT_FOUND: "ROUTE_NOT_FOUND",
	PARAMS_NOT_VALID: "PARAMS_NOT_VALID",
	USER_ALREADY_EXIST: "USER_ALREADY_EXIST",
	INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
} as const;
