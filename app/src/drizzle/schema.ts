import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
	id: integer("id").primaryKey(),
	firstName: text("first_name"),
	givenName: text("given_name"),
	createdAt: integer("created_at"),
});

export type User = typeof users.$inferSelect;
