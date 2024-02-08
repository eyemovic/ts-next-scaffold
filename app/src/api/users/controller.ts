import { tbValidator } from "@hono/typebox-validator";
import { HTTPException } from "hono/http-exception";
import app from "..";
import { User } from "../../db/types";
import { GLOBAL_MESSAGE, USER_MESSAGE } from "../constant";
import { createUser, findUserById, findUsers } from "./repository";
import { UserSchema } from "./schema/schema";

/**
 * User
 */
app
	.get("/user/:id", (c) => {
		const id = c.req.param("id");
		return c.json(findUserById(parseInt(id)));
	})
	.get("/users", (c) => {
		return c.json(findUsers());
	})
	.post(
		"/user",
		tbValidator("json", UserSchema, (result, c) => {
			if (!result.success) {
				throw new HTTPException(400, { message: GLOBAL_MESSAGE.INVALID_REQUEST });
			}
			createUser(result.data satisfies User);
			return c.text(USER_MESSAGE.USER_CREATED);
		}),
	);
