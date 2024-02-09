import { eq } from "drizzle-orm";
import { db } from "../../db/db";
import { $users } from "../../db/schema";
import { User } from "../../db/types";

/**
 * UserRepository
 * @description ユーザー情報に関するリポジトリ
 */
export const UserRepository = {
	/**
	 * ユーザーをIDで検索する
	 */
	findUserById: async (id: number): Promise<User | undefined> => {
		return await db.select().from($users).where(eq($users.id, id)).limit(1).get();
	},
	/**
	 * ユーザーを全件取得する
	 */
	findUsers: async (): Promise<Array<User>> => {
		return await db.select().from($users);
	},
	/**
	 * ユーザーを作成する
	 */
	addUser: async (user: User): Promise<void> => {
		return await db.insert($users).values(user);
	},
	/**
	 * ユーザーを複数作成する
	 */
	addUsers: async (users: Array<User>): Promise<void> => {
		return await db.insert($users).values(users);
	},
} as const;
