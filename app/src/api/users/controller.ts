import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { validator } from "hono/validator";
import { z } from "zod";
import { GLOBAL_MESSAGE, USER_MESSAGE } from "../../constant";
import { BaseController, BaseResponse } from "../../types";
import { userService } from "./service";
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
export const userController = {
	getById: async (c: Context) => {
		const id = parseInt(c.req.param("id"));
		const user = await userService.getById(id);
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
			data: await userService.getAll(),
		} satisfies BaseResponse<Array<User>>);
	},
	post: validator("json", (value, c) => {
		const parsed = userSchema.safeParse(value);
		if (!parsed.success) {
			throw new HTTPException(400, { message: GLOBAL_MESSAGE.INVALID_REQUEST });
		}
		userService.create(parsed.data);
		return c.json({
			success: true,
			status: 201,
			message: USER_MESSAGE.CREATED,
		} satisfies BaseResponse<never>);
	}),
	postMulti: validator("json", (value, c) => {
		const parsed = z.array(userSchema).safeParse(value);
		if (!parsed.success) {
			throw new HTTPException(400, { message: GLOBAL_MESSAGE.INVALID_REQUEST });
		}
		userService.createAll(parsed.data);
		return c.json({
			success: true,
			status: 201,
			message: USER_MESSAGE.CREATED,
		} satisfies BaseResponse<never>);
	}),
} as const satisfies UserController;
