/**
 * Возвращает массив
 */
export class ToArray {
	static execute() {
		return function <T extends unknown | unknown[]>(drop?: T): T extends unknown[] ? T : [T] | undefined {
			return drop && (Array.isArray(drop) ? drop : ([drop] as any));
		};
	}
}
