import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { validator } from "hono/validator";
import { z } from "zod";
import { GLOBAL_MESSAGE, USER_MESSAGE } from "../../constant";
import { BaseController } from "../../types";
import { userSchema } from "./schema";
import { userService } from "./service";

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
		return c.json(await userService.getById(id));
	},
	getAll: async (c: Context) => {
		return c.json(await userService.getAll());
	},
	post: validator("json", (value, c) => {
		const parsed = userSchema.safeParse(value);
		if (!parsed.success) {
			throw new HTTPException(400, { message: GLOBAL_MESSAGE.INVALID_REQUEST });
		}
		userService.create(parsed.data);
		return c.json({
			message: USER_MESSAGE.USER_CREATED,
		});
	}),
	postMulti: validator("json", (value, c) => {
		const parsed = z.array(userSchema).safeParse(value);
		if (!parsed.success) {
			throw new HTTPException(400, { message: GLOBAL_MESSAGE.INVALID_REQUEST });
		}
		userService.createAll(parsed.data);
		return c.json({
			message: USER_MESSAGE.USER_CREATED,
		});
	}),
} as const satisfies UserController;
