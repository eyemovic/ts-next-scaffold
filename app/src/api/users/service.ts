import { User } from "../../db/types";
import { UserRepository } from "./repository";

/**
 * UserService
 * @description
 * Serviceレイヤーの実装は任意
 * 処理が肥大化した際に、Serviceレイヤーを追加してビジネスロジックを分離する
 */
export const UserService = {
	/**
	 * ユーザーをIDで検索する
	 */
	findUserById: async (id: number): Promise<User | undefined> => {
		return await UserRepository.findUserById(id);
	},
	/**
	 * ユーザーを全件取得する
	 */
	findUsers: async (): Promise<Array<User>> => {
		return await UserRepository.findUsers();
	},
	/**
	 * ユーザーを作成する
	 */
	createUser: async (user: User): Promise<void> => {
		return await UserRepository.addUser(user);
	},
	/**
	 * ユーザーを複数作成する
	 */
	createUsers: async (users: Array<User>): Promise<void> => {
		return await UserRepository.addUsers(users);
	},
} as const;
