import { InferSelectModel } from "drizzle-orm";
import { $users } from "../schema";

/**
 * User
 * @property id - ID
 * @property firstName - 名
 * @property givenName - 姓
 * @property createdAt - 作成日時
 */
export type User = InferSelectModel<typeof $users>;
