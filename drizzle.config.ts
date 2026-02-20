import type { Config } from "drizzle-kit";

export default {
	schema: "./src/Logic/Domain/Infrastructure/InfrastructureBD/Imp/BD.table.ts",
	out: "./drizzle",
	dialect: "sqlite",
	dbCredentials: {
		url: "./app.sqlite",
	},
} satisfies Config;
