import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import { csrf } from "hono/csrf";
import { showRoutes } from "hono/dev";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { secureHeaders } from "hono/secure-headers";
import { defaultHookHandler, errorHandler, notFoundHandler, rootHandler } from "../middleware";
import { officeController } from "./office/controller";
import { indexRoute } from "./route";
import { userController } from "./users/controller";

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
})
	.doc(PRIVATE_OPENAPI_URL, {
		openapi: "3.0.0",
		info: {
			title: "Hono API",
			version: "1.0.0",
		},
	})
	.openapi(indexRoute, rootHandler)
	.get(
		PUBLIC_OPENAPI_URL,
		swaggerUI({
			url: PRIVATE_OPENAPI_URL,
		}),
	);
/** middleware */
app
	.use("*", logger())
	.use("*", prettyJSON())
	.use("*", csrf())
	.use("*", secureHeaders())
	.notFound(notFoundHandler)
	.onError(errorHandler);
/** /user */
app
	.get("/users/:id", userController.getById)
	.get("/users", userController.getAll)
	.post("/users", userController.post)
	.post("/users", userController.postMulti);
/** /office */
app
	.get("/offices/:id", officeController.getById)
	.get("/offices", officeController.getAll)
	.post("/offices", officeController.post)
	.post("/offices", officeController.postMulti);

showRoutes(app);
export default {
	port: 3000,
	fetch: app.fetch,
};
