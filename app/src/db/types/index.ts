import { $offices, $users } from "../schema";

/**
 * Office
 * @description Repositoryレイヤーで利用する
 * @property id - ID
 * @property name - オフィス名
 * @property createdAt - 作成日時
 */
export type OfficeEntity = typeof $offices.$inferSelect;

/**
 * User
 * @description Repositoryレイヤーで利用する
 * @property id - ID
 * @property firstName - 名
 * @property givenName - 姓
 * @property createdAt - 作成日時
 */
export type UserEntity = typeof $users.$inferSelect;
