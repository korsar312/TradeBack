import type { BDInterface as Interface } from "../BD.interface.ts";
import { DatabaseSync } from "node:sqlite";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { Read } from "./Methods/Read.ts";
import { Update } from "./Methods/Update.ts";
import { Delete } from "./Methods/Delete.ts";
import { Create } from "./Methods/Create.ts";

export type Row = Record<string, any>;

const SCHEMA_SQL: string = readFileSync(join(__dirname, "schema.sql"), "utf8");

class BDImp implements Interface.IAdapter {
	private readonly db: DatabaseSync;

	public create: Interface.ICreate;
	public read: Interface.IRead;
	public update: Interface.IUpdate;
	public delete: Interface.IDelete;

	constructor(filename: string = ":memory:") {
		this.db = new DatabaseSync(filename);

		this.create = new Create(this.db);
		this.read = new Read(this.db);
		this.update = new Update(this.db);
		this.delete = new Delete(this.db);

		this.initSchema();
	}

	initSchema(): void {
		this.db.exec("PRAGMA foreign_keys = ON;");
		this.db.exec(SCHEMA_SQL);
	}
}

export default BDImp;
