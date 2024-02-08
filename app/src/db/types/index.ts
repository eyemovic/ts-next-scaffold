import { InferSelectModel } from "drizzle-orm";
import { $offices, $users } from "../schema";

/**
 * Office
 * @property id - ID
 * @property name - オフィス名
 * @property createdAt - 作成日時
 */
export type Office = InferSelectModel<typeof $offices>;

/**
 * User
 * @property id - ID
 * @property firstName - 名
 * @property givenName - 姓
 * @property createdAt - 作成日時
 */
export type User = InferSelectModel<typeof $users>;
