import { Hono } from "hono";
import { showRoutes } from "hono/dev";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { secureHeaders } from "hono/secure-headers";
import { errorHandler, notFoundHandler } from "../middleware";
import { OfficeController } from "./office/controller";
import { UserController } from "./users/controller";

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
	.get("/users/:id", UserController.getById)
	.get("/users", UserController.getAll)
	.post("/users", UserController.post)
	.post("/users", UserController.postMulti);
/** /office */
app
	.get("/offices/:id", OfficeController.getById)
	.get("/offices", OfficeController.getAll)
	.post("/offices", OfficeController.post)
	.post("/offices", OfficeController.postMulti);

export default app;
showRoutes(app);
