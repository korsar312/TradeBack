export interface IThrow {
	error: string;
	reasonUser: string;
}

export function throwFn(error: string | { reasonUser: string }, lairError?: unknown): never {
	let reason = {
		error: JSON.stringify(error) + JSON.stringify(lairError),
		reasonUser: ""
	};

	if (typeof error === "object" && "reasonUser" in error) {
		reason.reasonUser += error.reasonUser;
	}

	if (typeof lairError === "object" && lairError !== null && "reasonUser" in lairError) {
		reason.reasonUser += lairError.reasonUser;
	}

	throw reason;
}
