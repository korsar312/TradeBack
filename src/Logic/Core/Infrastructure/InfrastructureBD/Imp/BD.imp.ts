import type { BDInterface as Interface } from "../BD.interface.ts";
import Database from "better-sqlite3";
import { BetterSQLite3Database, drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import path from "node:path";
import { Read } from "./Methods/Read.ts";
import { Update } from "./Methods/Update.ts";
import { Delete } from "./Methods/Delete.ts";
import { Create } from "./Methods/Create.ts";

class BDImp implements Interface.IAdapter {
	private readonly sqlite: Database.Database;
	private readonly db: BetterSQLite3Database;

	public create: Interface.ICreate;
	public read: Interface.IRead;
	public update: Interface.IUpdate;
	public delete: Interface.IDelete;

	constructor(filename: string = ":memory:") {
		this.sqlite = new Database(filename);
		this.sqlite.exec("PRAGMA foreign_keys = ON;");
		this.db = drizzle(this.sqlite);

		migrate(this.db, { migrationsFolder: path.resolve("./drizzle") });

		this.create = new Create(this.db);
		this.read = new Read(this.db);
		this.update = new Update(this.db);
		this.delete = new Delete(this.db);
	}
}

export default BDImp;
