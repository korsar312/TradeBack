type HotDataKey = "services" | "infrastructure";

export function createHmrSingleton<T>(key: HotDataKey, create: () => T): T {
	const g = globalThis as any;

	if (!g.__singletons) g.__singletons = {};
	if (!g.__singletons[key]) g.__singletons[key] = create();

	return g.__singletons[key] as T;
}
