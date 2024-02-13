import { InferSelectModel } from "drizzle-orm";
import { $offices, $users } from "../schema";

/**
 * Office
 * @description Repositoryレイヤーで利用する
 * @property id - ID
 * @property name - オフィス名
 * @property createdAt - 作成日時
 */
export type OfficeEntity = InferSelectModel<typeof $offices>;

/**
 * User
 * @description Repositoryレイヤーで利用する
 * @property id - ID
 * @property firstName - 名
 * @property givenName - 姓
 * @property createdAt - 作成日時
 */
export type UserEntity = InferSelectModel<typeof $users>;
