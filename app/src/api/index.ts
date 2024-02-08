import { Context, Hono } from "hono";
import { showRoutes } from "hono/dev";
import { HTTPException } from "hono/http-exception";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { secureHeaders } from "hono/secure-headers";
import { GLOBAL_MESSAGE } from "./constant";

const app = new Hono();

/**
 * Middleware
 * {@link https://hono.dev/middleware/builtin/logger}
 * {@link https://hono.dev/middleware/builtin/pretty-json}
 */
app.use("*", logger()); // ログ出力
app.use("*", prettyJSON()); // JSON文字列の整形

/**
 * Security
 * {@link https://hono.dev/middleware/builtin/secure-headers}
 */
app.use("*", secureHeaders());

/**
 * Routing
 * {@link https://hono.dev/api/routing}
 */
app.get("/", (c: Context) => {
	return c.text("Hello Hono!");
});

/**
 * Not Found
 * {@link https://hono.dev/api/hono#not-found}
 */
app.notFound((c) => {
	return c.text(GLOBAL_MESSAGE.NOT_FOUND, 404);
});

/**
 * Error Handling
 * {@link https://hono.dev/api/hono#error-handling}
 */
app.onError((err, c) => {
	if (err instanceof HTTPException) {
		console.error(err);
		return err.getResponse();
	}
	if (err instanceof Error) {
		console.error(err);
		return c.text(GLOBAL_MESSAGE.ERROR, 500);
	}
	console.error(err);
	return c.text(GLOBAL_MESSAGE.ERROR, 500);
});

export default app;
showRoutes(app);
