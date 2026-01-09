import { Utils } from "../../../Utils";

class ServiceProxy<T extends object> {
	public readonly invoke: T;

	constructor(implement: T) {
		this.invoke = this.createInvoker(implement);
	}

	private createInvoker<T extends object>(target: T): T {
		return new Proxy({} as T, {
			get: (_, prop: string | symbol) => {
				if (typeof prop === "string" && prop in target) {
					const value = target[prop as keyof T];
					return typeof value === "function" ? value.bind(target) : value;
				}
				throw Utils.error.createError({ reason: "INTERNAL_SERVER_ERROR", data: `${String(prop)} вариант API не существует` });
			},
		});
	}
}

export default ServiceProxy;
