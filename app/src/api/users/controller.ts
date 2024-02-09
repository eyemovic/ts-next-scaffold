import { tbValidator } from "@hono/typebox-validator";
import { Type as T } from "@sinclair/typebox";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { GLOBAL_MESSAGE, USER_MESSAGE } from "../../constant";
import { BaseController } from "../../types";
import { UserRepository } from "./repository";
import { userSchema } from "./schema/schema";

/**
 * UserController
 * @description ユーザー情報に関するコントローラー
 */
export const UserController = {
	/**
	 * ユーザーをIDで検索する
	 */
	getById: async (c: Context) => {
		const id = parseInt(c.req.param("id"));
		return c.json(await UserRepository.findUserById(id));
	},
	/**
	 * ユーザーを全件取得する
	 */
	getAll: async (c: Context) => {
		return c.json(await UserRepository.findUsers());
	},
	/**
	 * ユーザーを作成する
	 */
	post: tbValidator("json", userSchema, (result, c: Context) => {
		if (!result.success) {
			throw new HTTPException(400, { message: GLOBAL_MESSAGE.INVALID_REQUEST });
		}
		UserRepository.createUser(result.data);
		return c.text(USER_MESSAGE.USER_CREATED);
	}),
	/**
	 * ユーザーを複数作成する
	 */
	postMulti: tbValidator("json", T.Array(userSchema), (result, c: Context) => {
		if (!result.success) {
			throw new HTTPException(400, { message: GLOBAL_MESSAGE.INVALID_REQUEST });
		}
		UserRepository.createUsers(result.data);
		return c.text(USER_MESSAGE.USER_CREATED);
	}),
} as const satisfies BaseController;
