import { createRoute } from "@hono/zod-openapi";
import { z } from "zod";
import { BaseResponse } from "../types";

type OpenApiContentObject = {
	method: "get" | "post" | "put" | "delete";
	path: string;
	description: string;
	tags: string[];
	responses: {
		[key: number]: {
			description: string;
			content: {
				[key: string]: {
					schema: z.ZodType;
				};
			};
		};
	};
};

const baseOpenApiSchema = {
	successResponseSchema: z.object({
		success: z.boolean(),
		status: z.number(),
		message: z.string(),
		data: z.optional(z.any()),
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	}) satisfies z.ZodType<BaseResponse<any>>,
	validationErrorSchema: z.object({
		success: z.boolean(),
		status: z.number(),
		message: z.string(),
		errors: z.array(
			z
				.object({
					field: z.string(),
					message: z.string(),
				})
				.optional(),
		),
	}) satisfies z.ZodType<BaseResponse<never>>,
	internalServerErrorSchema: z.object({
		success: z.boolean(),
		status: z.number(),
		message: z.string(),
	}) satisfies z.ZodType<BaseResponse<never>>,
};

/**
 * OpenAPIの基底となるオブジェクト
 */
export const baseOpenApiRoute = {
	method: "get",
	path: "/",
	description: "root index",
	tags: ["root"],
	responses: {
		200: {
			description: "Success",
			content: {
				"application/json": {
					schema: baseOpenApiSchema.successResponseSchema,
				},
			},
		},
		400: {
			description: "Bad Request",
			content: {
				"application/json": {
					schema: baseOpenApiSchema.validationErrorSchema,
				},
			},
		},
		500: {
			description: "Internal Server Error",
			content: {
				"application/json": {
					schema: baseOpenApiSchema.internalServerErrorSchema,
				},
			},
		},
	},
} as const satisfies OpenApiContentObject;

/**
 * /index のOpenAPI定義
 */
export const indexRoute = createRoute({
	...baseOpenApiRoute,
	method: "get",
	path: "/",
});
