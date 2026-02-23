export class Delay {
	static execute() {
		return function (time: number) {
			return new Promise((resolve) => setTimeout(resolve, time));
		};
	}
}
