import { ErrorInterface, ErrorInterface as Interface } from "./Error.interface.ts";

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
}

export default ErrorImp;
