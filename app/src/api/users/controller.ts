import { tbValidator } from "@hono/typebox-validator";
import { Type as T } from "@sinclair/typebox";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import app from "..";
import { User } from "../../db/types";
import { GLOBAL_MESSAGE, USER_MESSAGE } from "../constant";
import { JsonResponse } from "../types";
import { UserRepository } from "./repository";
import { userSchema } from "./schema/schema";

/**
 * UserController
 * @description ユーザー情報に関するコントローラー
 */
const UserController = {
	getUserById: async (c: Context): JsonResponse<User | undefined> => {
		const id = c.req.param("id");
		const user = await UserRepository.findUserById(parseInt(id));
		const result = c.json(user);
		return result;
	},
	getUsers: async (c: Context): JsonResponse<Array<User>> => {
		return c.json(await UserRepository.findUsers());
	},
	postUser: tbValidator("json", userSchema, (result, c: Context): Response => {
		if (!result.success) {
			throw new HTTPException(400, { message: GLOBAL_MESSAGE.INVALID_REQUEST });
		}
		UserRepository.createUser(result.data);
		return c.text(USER_MESSAGE.USER_CREATED);
	}),
	postUsers: tbValidator("json", T.Array(userSchema), (result, c: Context): Response => {
		if (!result.success) {
			throw new HTTPException(400, { message: GLOBAL_MESSAGE.INVALID_REQUEST });
		}
		UserRepository.createUsers(result.data);
		return c.text(USER_MESSAGE.USER_CREATED);
	}),
} as const;

/**
 * Routing
 */
app
	.get("/user/:id", UserController.getUserById)
	.get("/users", UserController.getUsers)
	.post("/user", UserController.postUser)
	.post("/users", UserController.postUsers);
