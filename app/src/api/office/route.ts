import { createRoute } from "@hono/zod-openapi";
import { BaseRoute } from "../../types";
import { baseOpenApiRoute } from "../route";

type OfficeRoute = BaseRoute & {};

/**
 * /offices/:id のOpenAPI定義
 */
export const OfficeRoute = {
	getById: createRoute({
		...baseOpenApiRoute,
		method: "get",
		path: "/offices/:id",
		description: "オフィスをIDで検索する",
		tags: ["offices"],
	}),
	getAll: createRoute({
		...baseOpenApiRoute,
		method: "get",
		path: "/offices",
		description: "オフィスを全件取得する",
		tags: ["offices"],
	}),
	post: createRoute({
		...baseOpenApiRoute,
		method: "post",
		path: "/offices",
		description: "オフィスを作成する",
		tags: ["offices"],
	}),
	postMulti: createRoute({
		...baseOpenApiRoute,
		method: "post",
		path: "/offices",
		description: "オフィスを複数作成する",
		tags: ["offices"],
	}),
} satisfies OfficeRoute;
