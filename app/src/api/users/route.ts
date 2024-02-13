import { createRoute } from "@hono/zod-openapi";
import { BaseRoute } from "../../types";
import { baseOpenApiRoute } from "../route";

type UserRoute = BaseRoute & {};

/**
 * /users/:id のOpenAPI定義
 */
export const UserRoute = {
	getById: createRoute({
		...baseOpenApiRoute,
		method: "get",
		path: "/users/:id",
		description: "ユーザーをIDで検索する",
		tags: ["users"],
	}),
	getAll: createRoute({
		...baseOpenApiRoute,
		method: "get",
		description: "ユーザーを全件取得する",
		path: "/users",
		tags: ["users"],
	}),
	post: createRoute({
		...baseOpenApiRoute,
		method: "post",
		description: "ユーザーを作成する",
		path: "/users",
		tags: ["users"],
	}),
	postMulti: createRoute({
		...baseOpenApiRoute,
		method: "post",
		description: "ユーザーを複数作成する",
		path: "/users",
		tags: ["users"],
	}),
} satisfies UserRoute;
