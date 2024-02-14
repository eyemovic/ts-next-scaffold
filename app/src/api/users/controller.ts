import { zValidator } from "@hono/zod-validator";
import { Context } from "hono";
import { z } from "zod";
import { GLOBAL_MESSAGE, USER_MESSAGE } from "../../constant";
import { BaseController, BaseResponse } from "../../types";
import { UserService } from "./service";
import { User, userSchema } from "./types";

type UserController = BaseController & {};

/**
 * UserController
 * @description ユーザー情報に関するコントローラー
 * @property getById ユーザーをIDで検索する
 * @property getAll ユーザーを全件取得する
 * @property post ユーザーを作成する
 * @property postMulti ユーザーを複数作成する
 */
export const UserController = {
	getById: async (c: Context) => {
		const id = parseInt(c.req.param("id"));
		const user = await UserService.getById(id);
		if (!user) {
			return c.json({
				success: false,
				status: 204,
				message: USER_MESSAGE.NOT_FOUND,
			} satisfies BaseResponse<never>);
		}
		return c.json({
			success: true,
			status: 200,
			message: USER_MESSAGE.GET_BY_ID,
			data: user,
		} satisfies BaseResponse<User>);
	},
	getAll: async (c: Context) => {
		return c.json({
			success: true,
			status: 200,
			message: USER_MESSAGE.GET_ALL,
			data: await UserService.getAll(),
		} satisfies BaseResponse<Array<User>>);
	},
	post: zValidator("json", userSchema, (result, c) => {
		if (!result.success) {
			return c.json({
				success: false,
				status: 400,
				message: GLOBAL_MESSAGE.INVALID_REQUEST,
				error: result.error,
			} satisfies BaseResponse<never>);
		}
		UserService.create(result.data);
		return c.json({
			success: true,
			status: 201,
			message: USER_MESSAGE.CREATED,
		} satisfies BaseResponse<never>);
	}),
	postMulti: zValidator("json", z.array(userSchema), (result, c) => {
		if (!result.success) {
			return c.json({
				success: false,
				status: 400,
				message: GLOBAL_MESSAGE.INVALID_REQUEST,
				error: result.error,
			} satisfies BaseResponse<never>);
		}
		UserService.createAll(result.data);
		return c.json({
			success: true,
			status: 201,
			message: USER_MESSAGE.CREATED,
		} satisfies BaseResponse<never>);
	}),
} as const satisfies UserController;
