import { randomUUID } from "node:crypto";
import type { BDInterface as Interface } from "../../BD.interface.ts";
import { DatabaseSync } from "node:sqlite";
import { Row } from "../BD.imp.ts";

export class BDHelpers {
	constructor(private readonly db: DatabaseSync) {}

	protected idOrNew(id?: string): string {
		return id && id.length > 0 ? id : randomUUID();
	}

	protected getOne(sql: string, params: any[] = []): Row | null {
		const stmt = this.db.prepare(sql);
		const row = stmt.get(...params) as Row | undefined;
		return row ?? null;
	}

	protected getAll(sql: string, params: any[] = []): Row[] {
		const stmt = this.db.prepare(sql);
		return (stmt.all(...params) as Row[]) ?? [];
	}

	protected run(sql: string, params: any[] = []): number {
		const stmt = this.db.prepare(sql);
		const res = stmt.run(...params);
		return Number(res.changes ?? 0);
	}

	protected readScalar<T>(table: string, col: string, id: string): T | null {
		const row = this.getOne(`SELECT ${col} AS v FROM ${table} WHERE id = ?`, [id]);
		return row ? (row.v as T) : null;
	}

	protected updateField(table: string, col: string, id: string, value: any): number {
		return this.run(`UPDATE ${table} SET ${col} = ? WHERE id = ?`, [value, id]);
	}

	protected updatePatch(table: string, id: string, patch: Record<string, any>, fieldToCol: Record<string, string>): number {
		const keys = Object.keys(patch).filter((k) => k !== "id" && patch[k] !== undefined);
		if (keys.length === 0) return 0;

		const sets: string[] = [];
		const params: any[] = [];

		for (const field of keys) {
			const col = fieldToCol[field];
			if (!col) continue;
			sets.push(`${col} = ?`);
			params.push(patch[field]);
		}

		if (sets.length === 0) return 0;
		params.push(id);

		return this.run(`UPDATE ${table} SET ${sets.join(", ")} WHERE id = ?`, params);
	}

	/**
	 * read.entity(id) + read.entity.field(id)
	 * Реализация через Proxy, чтобы не ломаться на field="name" (Function.name read-only).
	 */
	protected mkReadEntity<T extends { id: string }>(
		table: string,
		readWhole: (id: string) => T | null,
		fieldToCol: Record<string, string>,
	): Interface.ReadEntity<T> {
		const callable = ((id: string) => readWhole(id)) as any;

		return new Proxy(callable, {
			get: (_target, prop: string | symbol) => {
				if (typeof prop !== "string") return undefined;

				const col = fieldToCol[prop];
				if (col) return (id: string) => this.readScalar(table, col, id);

				return undefined;
			},
		}) as any;
	}

	/**
	 * update.entity(entity) + update.entity.field(id, value) + update.entity.patch(id, patch)
	 * Proxy, чтобы работали любые имена полей.
	 */
	protected mkUpdateEntity<T extends { id: string }>(
		table: string,
		fullCols: string[],
		toRow: (e: T) => Record<string, any>,
		fieldToCol: Record<string, string>,
	): Interface.UpdateEntity<T> {
		const callable = ((entity: T) => {
			const row = toRow(entity);
			const sets = fullCols.map((c) => `${c} = ?`).join(", ");
			const params = [...fullCols.map((c) => row[c]), entity.id];
			return this.run(`UPDATE ${table} SET ${sets} WHERE id = ?`, params);
		}) as any;

		const patchFn = (id: string, patch: Partial<Omit<T, "id">>) => this.updatePatch(table, id, patch as any, fieldToCol);

		return new Proxy(callable, {
			get: (_target, prop: string | symbol) => {
				if (prop === "patch") return patchFn;
				if (typeof prop !== "string") return undefined;

				const col = fieldToCol[prop];
				if (col) return (id: string, value: any) => this.updateField(table, col, id, value);

				return undefined;
			},
		}) as any;
	}
}
