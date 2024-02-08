import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

/**
 * users テーブル
 */
export const $users = sqliteTable("users", {
	id: integer("id").primaryKey(),
	firstName: text("first_name"),
	givenName: text("given_name"),
	createdAt: text("created_at"),
});

/**
 * User
 * @property id - ID
 * @property firstName - 名
 * @property givenName - 姓
 * @property createdAt - 作成日時
 */
export type User = typeof $users.$inferSelect;
