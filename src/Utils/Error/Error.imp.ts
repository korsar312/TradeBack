import { ErrorInterface as Interface } from "./Error.interface.ts";
import type { z } from "zod";

export class ErrorSys extends Error implements Interface.TError {
	private errorObj: Interface.TError;

	constructor(
		private params: Interface.TErrorReason,
		getError: (params: Interface.TErrorReason) => Interface.TError,
	) {
		super();
		this.errorObj = getError(params);
	}

	public get httpCode() {
		return this.errorObj.httpCode;
	}

	public get message() {
		return this.errorObj.message;
	}

	public get data() {
		return this.params.data;
	}
}

function isKeyOf<T extends object>(obj: T, key: PropertyKey): key is keyof T {
	return Object.prototype.hasOwnProperty.call(obj, key);
}

class ErrorImp implements Interface.IAdapter {
	//==============================================================================================

	constructor(private readonly errorMap: Interface.TErrorMap) {}

	//==============================================================================================

	public getError(params: Interface.TErrorReason): Interface.TError {
		const { httpCode, message } = isKeyOf(this.errorMap, params.reason) ? this.errorMap[params.reason] : this.unknownError;
		return { httpCode, message, data: params.data };
	}

	public createError(params: Interface.TErrorReason) {
		return new ErrorSys(params, this.getError.bind(this));
	}

	public get unknownError(): Interface.TError {
		return this.errorMap.INTERNAL_SERVER_ERROR;
	}

	public parseQuery<TSchema extends z.ZodType>(
		params?: unknown,
		schema?: TSchema,
		userError?: Interface.EErrorReason,
	): z.output<TSchema> {
		const r = schema?.safeParse(params);
		if (!r?.success) throw this.createError({ reason: userError ?? "PARAMS_NOT_VALID", data: JSON.parse(r?.error?.message || "") });

		return r.data;
	}
}
export default ErrorImp;
