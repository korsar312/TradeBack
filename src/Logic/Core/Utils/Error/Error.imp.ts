import type { ErrorInterface, ErrorInterface as Interface } from "./Error.interface.ts";
import type { z } from "zod";

class ErrorImp implements Interface.IAdapter {
	//==============================================================================================

	constructor(private readonly errorMap: Interface.TErrorMap) {}

	//==============================================================================================

	public getError(innerReason: string | ErrorInterface.EErrorReason): Interface.TError {
		let reason: ErrorInterface.EErrorReason;

		if (innerReason in this.errorMap) reason = innerReason as ErrorInterface.EErrorReason;
		else reason = "INTERNAL_SERVER_ERROR" satisfies ErrorInterface.EErrorReason;

		const { httpCode, message } = this.errorMap[reason];

		return {
			httpCode,
			message,
		};
	}

	parseQuery<TSchema extends z.ZodType>(req: unknown, schema: TSchema): z.output<TSchema> {
		const r = schema.safeParse(req);
		if (!r.success) throw new Error("PARAMS_NOT_VALID" satisfies ErrorInterface.EErrorReason);

		return r.data;
	}
}

export default ErrorImp;
