import { Context, Hono } from "hono";
import { showRoutes } from "hono/dev";
import { HTTPException } from "hono/http-exception";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { secureHeaders } from "hono/secure-headers";
import { GLOBAL_MESSAGE } from "../constant";

/**
 * Root
 * @param c
 * @returns
 */
const rootHandler = (c: Context) => {
	return c.text("Hello Hono!");
};

/**
 * Not Found
 * @param c
 * @returns
 */
const notFoundHandler = (c: Context) => {
	return c.text(GLOBAL_MESSAGE.NOT_FOUND, 404);
};

/**
 * Error
 * @param err
 * @param c
 * @returns
 */
const errorHandler = (err: Error, c: Context) => {
	if (err instanceof HTTPException) {
		console.error(err);
		return err.getResponse();
	}
	console.error(err);
	return c.text(GLOBAL_MESSAGE.ERROR, 500);
};

/**
 * Middleware
 * {@link https://hono.dev/middleware/builtin/logger}
 * {@link https://hono.dev/middleware/builtin/pretty-json}
 * {@link https://hono.dev/middleware/builtin/secure-headers}
 * Routing
 * {@link https://hono.dev/api/routing}
 * Not Found
 * {@link https://hono.dev/api/hono#not-found}
 * Error Handling
 * {@link https://hono.dev/api/hono#error-handling}
 */
const app = new Hono()
	.use("*", logger())
	.use("*", prettyJSON())
	.use("*", secureHeaders())
	.get("/", rootHandler)
	.notFound(notFoundHandler)
	.onError(errorHandler);

export default app;
showRoutes(app);
