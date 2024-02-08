import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

/**
 * users テーブル
 */
export const $users = sqliteTable("users", {
	id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
	firstName: text("first_name").notNull(),
	givenName: text("given_name").notNull(),
	createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
