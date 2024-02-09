import { tbValidator } from "@hono/typebox-validator";
import { Type as T } from "@sinclair/typebox";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { HandlerResponse } from "hono/types";
import app from "..";
import { GLOBAL_MESSAGE, USER_MESSAGE } from "../../constant";
import { User } from "../../db/types";
import { BaseController } from "../../types";
import { UserRepository } from "./repository";
import { userSchema } from "./schema/schema";

/**
 * UserController
 * @description ユーザー情報に関するコントローラー
 */
const UserController = {
	getById: async (c: Context) => {
		const id = parseInt(c.req.param("id"));
		return c.json(await UserRepository.findUserById(id)) satisfies HandlerResponse<User>;
	},
	getAll: async (c: Context) => {
		return c.json(await UserRepository.findUsers());
	},
	post: tbValidator("json", userSchema, (result, c: Context) => {
		if (!result.success) {
			throw new HTTPException(400, { message: GLOBAL_MESSAGE.INVALID_REQUEST });
		}
		UserRepository.createUser(result.data);
		return c.text(USER_MESSAGE.USER_CREATED);
	}),
	postMulti: tbValidator("json", T.Array(userSchema), (result, c: Context) => {
		if (!result.success) {
			throw new HTTPException(400, { message: GLOBAL_MESSAGE.INVALID_REQUEST });
		}
		UserRepository.createUsers(result.data);
		return c.text(USER_MESSAGE.USER_CREATED);
	}),
} as const satisfies BaseController;

/**
 * Routing
 */
app
	.get("/user/:id", UserController.getById)
	.get("/users", UserController.getAll)
	.post("/user", UserController.post)
	.post("/users", UserController.postMulti);
