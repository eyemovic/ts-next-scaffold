import { BaseService } from "../../types";
import { UserRepository } from "./repository";
import { User } from "./types";

type UserService = BaseService<User> & {};

/**
 * UserService
 * @description
 * Serviceレイヤーの実装は任意
 * 処理が肥大化した際に、Serviceレイヤーを追加してビジネスロジックを分離する
 *
 * @property getById ユーザーをIDで検索する
 * @property getAll ユーザーを全件取得する
 * @property create ユーザーを作成する
 * @property createAll ユーザーを複数作成する
 */
export const UserService = {
	getById: async (id: number): Promise<User | undefined> => {
		return (await UserRepository.findById(id)) satisfies User | undefined;
	},
	getAll: async (): Promise<Array<User>> => {
		return (await UserRepository.findAll()) satisfies Array<User>;
	},
	create: async (user: User): Promise<void> => {
		return await UserRepository.add(user);
	},
	createAll: async (users: Array<User>): Promise<void> => {
		return await UserRepository.addAll(users);
	},
} as const satisfies UserService;
