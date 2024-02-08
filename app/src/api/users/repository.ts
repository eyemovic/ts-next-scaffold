import { eq } from "drizzle-orm";
import { db } from "../../drizzle/db";
import { $users } from "../../drizzle/schema";
import { User } from "../../drizzle/schema";

/**
 * ユーザーをIDで検索する
 * @param id
 * @returns
 */
export const findUserById = async (id: number): Promise<User | undefined> => {
	return await db.select().from($users).where(eq($users.id, id)).limit(1).get();
};

/**
 * ユーザーを全件取得する
 * @returns
 */
export const findUsers = async (): Promise<Array<User>> => {
	return await db.select().from($users);
};

/**
 * ユーザーを作成する
 * @param user
 * @returns
 */
export const createUser = async (user: User): Promise<void> => {
	return await db.insert($users).values(user);
};
