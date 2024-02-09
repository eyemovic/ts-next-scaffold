import { Handler, MiddlewareHandler } from "hono/types";

/**
 * Controllerのテンプレート
 */
export type BaseController = {
	readonly getById: Handler;
	readonly getAll: Handler;
	readonly post: MiddlewareHandler;
	readonly postMulti: MiddlewareHandler;
};
