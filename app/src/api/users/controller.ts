import { tbValidator } from "@hono/typebox-validator";
import { Type as T } from "@sinclair/typebox";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import app from "..";
import { User } from "../../db/types";
import { GLOBAL_MESSAGE, USER_MESSAGE } from "../constant";
import { R } from "../types";
import { UserRepository } from "./repository";
import { UserSchema } from "./schema/schema";

/**
 * UserController
 * @description ユーザー情報に関するコントローラー
 */
const UserController = {
	getUserById: async (c: Context): R<User | undefined> => {
		const id = c.req.param("id");
		const user = await UserRepository.findUserById(parseInt(id));
		const result = c.json(user);
		return result;
	},
	getUsers: async (c: Context): R<Array<User>> => {
		return c.json(await UserRepository.findUsers());
	},
	postUser: tbValidator("json", UserSchema, (result, c): Response => {
		if (!result.success) {
			throw new HTTPException(400, { message: GLOBAL_MESSAGE.INVALID_REQUEST });
		}
		UserRepository.createUser(result.data satisfies User);
		return c.text(USER_MESSAGE.USER_CREATED);
	}),
	postUsers: tbValidator("json", T.Array(UserSchema), (result, c): Response => {
		if (!result.success) {
			throw new HTTPException(400, { message: GLOBAL_MESSAGE.INVALID_REQUEST });
		}
		UserRepository.createUsers(result.data satisfies Array<User>);
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
