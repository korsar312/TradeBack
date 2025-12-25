export namespace typesUtils {
	/**
	 * Рекурсивный тип: значение T или массив произвольной глубины
	 * из T | undefined | false.
	 *
	 * Пример:
	 * TDeepTypeObject<string> =>
	 * "foo"
	 * ["foo", ["bar", false]]
	 */
	export type TDeepTypeObject<T> = typesUtils.RecursiveArray<T | undefined | false> | T;

	/**
	 * Тип для массива с произвольной вложенностью.
	 * Каждый элемент — либо значение указанного типа,
	 * либо массив таких же элементов.
	 *
	 * Пример:
	 * RecursiveArray<number> =>
	 * [1, 2, [3, [4]]]
	 */
	export type RecursiveArray<type> = {
		[index: number]: RecursiveArray<type> | type;
		length: number;
	};

	/**
	 * PartialRequired делает все поля опциональными,
	 * кроме указанных ключей K — они остаются обязательными.
	 *
	 * Пример:
	 * type A = { a: string; b: number; c?: boolean };
	 * type B = PartialWithRequired<A, 'a'>;
	 *
	 * { a: "x" } ✅
	 * { a: "x", b: 1 } ✅
	 * { b: 1 } ❌ ошибка — a обязателен
	 */
	export type PartialRequired<T, K extends keyof T> = Partial<Omit<T, K>> & Required<Pick<T, K>>;

	/**
	 * ExclusiveKeys гарантирует, что в объекте будет указан
	 * ровно один ключ из набора.
	 *
	 * Пример:
	 * type A = { a: string; b: number; c: boolean };
	 * type B = ExclusiveKeys<A>;
	 *
	 * { a: "x" } ✅
	 * { b: 1 } ✅
	 * { a: "x", b: 1 } ❌ ошибка
	 */
	export type ExclusiveKeys<T> = {
		[K in keyof T]: { [P in K]: T[K] } & Partial<Record<Exclude<keyof T, K>, never>>;
	}[keyof T];

	/**
	 * XOR (exclusive OR) для типов.
	 * Позволяет выбрать либо T, либо U, но не оба сразу.
	 *
	 * Пример:
	 * type A = { a: string; };
	 * type B = { b: number; };
	 *
	 * type C = XOR<A, B>;
	 * // { a: string } ✅
	 * // { b: number } ✅
	 * // { a: string; b: number } ❌ ошибка типов
	 */
	type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
	export type XOR<T, U> = (Without<T, U> & U) | (Without<U, T> & T);

	/**
	 * CreateOptionsUnion формирует union-тип из карты:
	 * {
	 *   KEY1: Type1,
	 *   KEY2: Type2,
	 *   ...
	 * }
	 *
	 * На выходе получается объединение структур вида:
	 * { type: KEY1; options: Type1 } & Extra
	 * { type: KEY2; options: Type2 } & Extra
	 * ...
	 *
	 * Параметры:
	 * - Map — объект-карта: ключ → тип options
	 * - Extra — дополнительные поля (например id)
	 *
	 * Пример:
	 * type UI = CreateOptionsUnion<{
	 *   BTN: BtnOptions;
	 *   INPUT: InputOptions;
	 * }, { id: string }>;
	 *
	 * // Результат:
	 * // { type: "BTN"; options: BtnOptions; id: string }
	 * // | { type: "INPUT"; options: InputOptions; id: string }
	 */
	export type OptionsUnion<Map extends Record<string, any>, Extra extends object = {}> = {
		[K in keyof Map]: { type: K; options: Map[K] } & Extra;
	}[keyof Map];
}
