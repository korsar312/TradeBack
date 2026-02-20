import type { BDInterface as Interface } from "../../BD.interface.ts";
import type { BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import { eq } from "drizzle-orm";

export class BDHelpers {
	constructor(protected readonly db: BetterSQLite3Database) {}

	/** Create a read proxy for an entity: allows read.entity(id) and read.entity.field(id) */
	protected mkReadEntity<T extends { id: string }>(table: any, readWhole: (id: string) => T | null): Interface.ReadEntity<T> {
		const callable = ((id: string) => readWhole(id)) as any;
		return new Proxy(callable, {
			get: (_target, prop: string | symbol) => {
				if (typeof prop !== "string") return undefined;
				if (!(table as any)[prop]) return undefined;
				return (id: string) => {
					const res = this.db
						.select({ v: (table as any)[prop] })
						.from(table)
						.where(eq(table.id, id))
						.get();
					return res ? (res.v as unknown as T[keyof T]) : null;
				};
			},
		}) as Interface.ReadEntity<T>;
	}

	/** Create an update proxy for an entity: allows update.entity(entity), update.entity.field(id, value), update.entity.patch(id, patch) */
	protected mkUpdateEntity<T extends { id: string }>(table: any, toRow: (entity: T) => Record<string, any>): Interface.UpdateEntity<T> {
		const callable = ((entity: T) => {
			const data = toRow(entity);
			const result = this.db.update(table).set(data).where(eq(table.id, entity.id)).run();
			return Number(result.changes ?? 0);
		}) as any;

		const patchFn = (id: string, patch: Partial<Omit<T, "id">>) => {
			const data: Record<string, any> = { ...patch };
			delete data.id;
			for (const key in data) {
				if (data[key] === undefined) {
					delete data[key];
				}
			}
			if (Object.keys(data).length === 0) return 0;
			const result = this.db.update(table).set(data).where(eq(table.id, id)).run();
			return Number(result.changes ?? 0);
		};

		return new Proxy(callable, {
			get: (_target, prop: string | symbol) => {
				if (prop === "patch") return patchFn;
				if (typeof prop !== "string") return undefined;
				if (!(table as any)[prop]) return undefined;
				return (id: string, value: any) => {
					const data = { [prop]: value };
					const result = this.db.update(table).set(data).where(eq(table.id, id)).run();
					return Number(result.changes ?? 0);
				};
			},
		}) as Interface.UpdateEntity<T>;
	}
}
