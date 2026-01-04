export namespace ErrorInterface {
	export interface IAdapter {
		getError(innerReason: EErrorReason): TError;
	}

	export type TError = {
		message: string;
		httpCode: number;
	};

	export type EErrorReason = keyof typeof ErrorReason;
	export type TErrorMap = Record<EErrorReason, TError>;
}

export const ErrorReason = {
	AUTH_INVALID: "AUTH_INVALID",
	USER_NOT_FOUND: "USER_NOT_FOUND",
	ROUTE_NOT_FOUND: "ROUTE_NOT_FOUND",
	INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
} as const;
