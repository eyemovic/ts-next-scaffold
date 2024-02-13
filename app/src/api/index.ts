import { Hono } from "hono";
import { showRoutes } from "hono/dev";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { secureHeaders } from "hono/secure-headers";
import { errorHandler, notFoundHandler } from "../middleware";
import { officeController } from "./office/controller";
import { userController } from "./users/controller";

/**
 * Hono Router
 *
 * {@link https://hono.dev}
 * {@link https://hono.dev/middleware/builtin/logger}
 * {@link https://hono.dev/middleware/builtin/pretty-json}
 * {@link https://hono.dev/middleware/builtin/secure-headers}
 * {@link https://hono.dev/api/routing}
 * {@link https://hono.dev/api/hono#not-found}
 * {@link https://hono.dev/api/hono#error-handling}
 */
const app = new Hono()
	.use("*", logger())
	.use("*", prettyJSON())
	.use("*", secureHeaders())
	.get("/", (c) => c.text("Hello Hono!"))
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

export default app;
showRoutes(app);
