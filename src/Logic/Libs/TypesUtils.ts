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

	/**
	 * TItemChange удаляет вложенный ключ K из объекта-поля T у типа A,
	 * сохраняя остальные поля без изменений.
	 *
	 * Работает “структурно”:
	 * - выбирается ключ T только среди тех полей A, которые являются object
	 * - выбирается ключ K только среди ключей вложенного объекта A[T]
	 * - в результате поле T становится объектом без ключа K
	 *
	 * На выходе получается структура вида:
	 * Omit<A, T> & { [T]: Omit<A[T], K> }
	 *
	 * Параметры:
	 * - A — исходный тип (в том числе может быть union)
	 * - T — ключ поля в A, значение которого является object
	 * - K — ключ вложенного объекта A[T], который нужно удалить
	 *
	 * Пример:
	 * type A = {
	 *   id: string;
	 *   meta: { a: number; b: string; c: boolean };
	 *   title: string;
	 * };
	 *
	 * type R = TItemChange<A, "meta", "b">;
	 * // Результат:
	 * // {
	 * // id: string;
	 * // title: string;
	 * // meta: { a: number; c: boolean };
	 * // }
	 *
	 * Особенности:
	 * - Если A — union, преобразование применяется к каждому варианту union.
	 * - Если T/К не подходят ограничениям, тип не собирается (ошибка на уровне generic constraints).
	 */
	type ObjKeys<A> = { [P in keyof A]-?: A[P] extends object ? P : never }[keyof A];
	type Nested<A, T extends PropertyKey> = A extends unknown ? (T extends keyof A ? (A[T] extends object ? keyof A[T] : never) : never) : never;
	type OmitKeys<T, K extends PropertyKey> = Omit<T, Extract<K, keyof T>>;
	export type TItemChange<A, T extends ObjKeys<A>, K extends Nested<A, T>> = A extends unknown
		? Omit<A, T> & { [P in T]-?: A[P] extends object ? OmitKeys<A[P], K> : A[P] }
		: never;

	/**
	 * PartialField — делает ОДНО поле P "мягким" (partial),
	 *
	 * Важное:
	 * - если A = A1 | A2 | ...,
	 *   то результат будет (A1 с partial P) | (A2 с partial P) | ...
	 * - если A[P] — объект, применяется DistributivePartial к A[P]
	 *
	 * Пример:
	 * type Item =
	 *   | { type: "CARD"; info: { bank: string; age: string } }
	 *   | { type: "GUARD"; info: { cvb: string } };
	 *
	 * type ItemFilter = PartialField<Item, "info">;
	 * // { type:"CARD"; info:{ bank?:string; age?:string } } ✅
	 * // { type:"GUARD"; info:{ cvb?:string } } ✅
	 *
	 * Это позволяет писать:
	 * if (item.type === "CARD" && params.type === "CARD") {
	 *   params.info.bank // ✅ есть (но optional)
	 * }
	 */
	type DistributivePartial<T> = T extends object ? { [K in keyof T]?: T[K] } : T;
	export type PartialField<A, P extends keyof A> = A extends unknown
		? Omit<A, P> & { [K in P]: A[K] extends object ? DistributivePartial<A[K]> : A[K] }
		: never;

	/**
	 * ReplaceKey<T, K, V> заменяет тип значения у ключа K в объектном типе T
	 * на новый тип V, сохраняя остальные поля без изменений.
	 *
	 * Работает точечно:
	 * - проходит по всем ключам `keyof T`
	 * - если текущий ключ совпадает с K — подставляет V
	 * - иначе оставляет исходный тип `T[P]`
	 * - optional (`?`) и readonly модификаторы сохраняются автоматически,
	 *   потому что используется маппинг по существующим ключам
	 *
	 * На выходе получается структура вида:
	 * {
	 *   [P in keyof T]: P extends K ? V : T[P]
	 * }
	 *
	 * Параметры:
	 * - T — исходный объектный тип
	 * - K — ключ, тип которого нужно заменить (PropertyKey: string | number | symbol)
	 * - V — новый тип значения для ключа K
	 *
	 * Пример:
	 * type A = {
	 *   id: string;
	 *   meta?: { a: number };
	 *   readonly count: number;
	 * };
	 *
	 * type R = ReplaceKey<A, "id", number>;
	 * // Результат:
	 * // {
	 * //   id: number;
	 * //   meta?: { a: number };
	 * //   readonly count: number;
	 * // }
	 *
	 * Особенности:
	 * - Не меняет структуру типа, кроме указанного ключа
	 * - Сохраняет `?` и `readonly` как в исходном T
	 * - Если K отсутствует в T, результат совпадает с T (ничего не меняется)
	 */
	export type ReplaceKeyStrict<T extends object, K extends keyof T, V> = {
		[P in keyof T]: P extends K ? V : T[P];
	};
}
