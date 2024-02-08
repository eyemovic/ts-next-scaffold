import { tbValidator } from "@hono/typebox-validator";
import { Hono } from "hono";
import { User } from "../drizzle/schema";
import { createUser, findUserById, findUsers } from "./users/repository";
import { UserSchema } from "./users/schema/schema";

const app = new Hono();
/**
 * Get
 */
app
	.get("/", (c) => {
		return c.text("Hello Hono!");
	})
	.get("/user/:id", (c) => {
		const id = c.req.param("id");
		return c.json(findUserById(parseInt(id)));
	})
	.get("/users", (c) => {
		return c.json(findUsers());
	});
/**
 * Post
 */
app.post(
	"/user",
	tbValidator("json", UserSchema, (result, c) => {
		if (!result.success) {
			return c.text("Invalid user", 400);
		}
		createUser(result.data satisfies User);
		return c.text("User created");
	}),
);
/**
 * Not Found
 */
app.notFound((c) => {
	return c.text("Custom 404 Not Found", 404);
});
/**
 * Error Handling
 */
app.onError((err, c) => {
	console.error(`${err}`);
	return c.text("Custom Error Message", 500);
});

export default {
	port: 3000,
	fetch: app.fetch,
};
