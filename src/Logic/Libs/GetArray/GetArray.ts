/**
 * Возвращает массив
 */
export class GetArray {
	static execute() {
		return function (arr: any) {
			return Array.isArray(arr) ? arr.flat() : [arr];
		};
	}
}
