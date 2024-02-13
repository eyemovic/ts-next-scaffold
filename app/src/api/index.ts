import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import { Handler } from "hono";
import { csrf } from "hono/csrf";
import { showRoutes } from "hono/dev";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { secureHeaders } from "hono/secure-headers";
import { defaultHookHandler, errorHandler, notFoundHandler, rootHandler } from "../middleware";
import { OfficeController } from "./office/controller";
import { OfficeRoute } from "./office/route";
import { indexRoute } from "./route";
import { UserController } from "./users/controller";
import { UserRoute } from "./users/route";

const PUBLIC_OPENAPI_URL = "/doc" as const;
const PRIVATE_OPENAPI_URL = "/specification" as const;

/**
 * Hono Router
 *
 * {@link https://hono.dev}
 * {@link https://hono.dev/middleware/builtin/logger}
 * {@link https://hono.dev/middleware/builtin/pretty-json}
 * {@link https://hono.dev/middleware/builtin/csrf}
 * {@link https://hono.dev/middleware/builtin/secure-headers}
 * {@link https://hono.dev/api/routing}
 * {@link https://hono.dev/api/hono#not-found}
 * {@link https://hono.dev/api/hono#error-handling}
 */
const app = new OpenAPIHono({
	defaultHook: defaultHookHandler,
}).doc(PRIVATE_OPENAPI_URL, {
	openapi: "3.0.0",
	info: {
		title: "Hono API",
		version: "1.0.0",
	},
});

/**
 * middleware の設定
 */
app
	.use("*", logger())
	.use("*", prettyJSON())
	.use("*", csrf())
	.use("*", secureHeaders())
	.notFound(notFoundHandler)
	.onError(errorHandler);

/**
 * /user のルーティング
 */
app
	.openapi(indexRoute, rootHandler)
	.openapi(UserRoute.getById, UserController.getById)
	.openapi(UserRoute.getAll, UserController.getAll)
	.openapi(UserRoute.post, UserController.post as Handler) // zValidatorだと型が合わないため無理やりキャスト
	.openapi(UserRoute.postMulti, UserController.postMulti as Handler); // zValidatorだと型が合わないため無理やりキャスト

/**
 * /office のルーティング
 */
app
	.openapi(OfficeRoute.getById, OfficeController.getById)
	.openapi(OfficeRoute.getAll, OfficeController.getAll)
	.openapi(OfficeRoute.post, OfficeController.post as Handler) // zValidatorだと型が合わないため無理やりキャスト
	.openapi(OfficeRoute.postMulti, OfficeController.postMulti as Handler); // zValidatorだと型が合わないため無理やりキャスト

/**
 * /doc
 * @description Swagger UIは最後に設定する
 * {@link https://github.com/honojs/middleware/tree/main/packages/swagger-ui}
 */
app.get(
	PUBLIC_OPENAPI_URL,
	swaggerUI({
		url: PRIVATE_OPENAPI_URL,
	}),
);

/**
 * Debug: ルーティングの表示
 */
showRoutes(app);

export default {
	port: 3000,
	fetch: app.fetch,
};
