import { eq } from "drizzle-orm";
import { db } from "../../db/db";
import { $users } from "../../db/schema";
import { UserEntity } from "../../db/types";
import { BaseRepository } from "../../types";
import { User } from "./schema";

export type UserRepository = {} & BaseRepository<User, UserEntity>;

/**
 * UserRepository
 * @description ユーザー情報に関するリポジトリ
 * @property findById - ユーザーをIDで検索する
 * @property findAll - ユーザーを全件取得する
 * @property add - ユーザーを作成する
 * @property addMulti - ユーザーを複数作成する
 */
export const userRepository = {
	findById: async (id: number): Promise<UserEntity | undefined> => {
		return await db.select().from($users).where(eq($users.id, id)).limit(1).get();
	},
	findAll: async (): Promise<Array<UserEntity>> => {
		return await db.select().from($users);
	},
	add: async (user: User): Promise<void> => {
		return await db.insert($users).values(user);
	},
	addAll: async (users: Array<User>): Promise<void> => {
		return await db.insert($users).values(users);
	},
} as const satisfies UserRepository;
