import { Hono } from "hono";
import { findUsers } from "./users/repository";

const app = new Hono();

/**
 * Get
 */
app
	.get("/", (c) => {
		return c.text("Hello Hono!");
	})
	.get("/users", (c) => {
		return c.json(findUsers());
	});

// Not Found
app.notFound((c) => {
	return c.text("Custom 404 Not Found", 404);
});

// Error handling
app.onError((err, c) => {
	console.error(`${err}`);
	return c.text("Custom Error Message", 500);
});

export default {
	port: 3000,
	fetch: app.fetch,
};
