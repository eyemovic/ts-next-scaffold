import { Context, ErrorHandler, NotFoundHandler } from "hono";
import { HTTPException } from "hono/http-exception";
import { SafeParseReturnType, ZodIssue } from "zod";
import { GLOBAL_MESSAGE } from "../constant";
import { BaseResponse } from "../types";

/**
 * Root
 * @param c
 * @returns
 */
export const rootHandler = (c: Context) => {
	return c.json({
		success: true,
		status: 200,
		message: "Hello Hono!",
	} satisfies BaseResponse<never>);
};

/**
 * Not Found
 */
export const notFoundHandler: NotFoundHandler = (c: Context) => {
	return c.text(GLOBAL_MESSAGE.NOT_FOUND, 404);
};

/**
 * Error
 */
export const errorHandler: ErrorHandler = (err: Error, c: Context) => {
	if (err instanceof HTTPException) {
		console.error(err);
		return c.json({
			success: false,
			status: err.status,
			message: err.message,
			error: err.res,
		} satisfies BaseResponse<never>);
	}
	console.error(err);
	return c.text(GLOBAL_MESSAGE.ERROR, 500);
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const defaultHookHandler = (result: SafeParseReturnType<any, any>, c: Context) => {
	if (!result.success) {
		return c.json({
			success: false,
			status: 422,
			message: "Invalid Input",
			error: result.error.errors.map((error: ZodIssue) => ({
				field: error.path[0],
				message: error.message,
			})),
		} satisfies BaseResponse<never>);
	}
	return c.json(result.data);
};
