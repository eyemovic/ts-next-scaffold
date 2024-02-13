import { Context, ErrorHandler, NotFoundHandler } from "hono";
import { HTTPException } from "hono/http-exception";
import { GLOBAL_MESSAGE } from "../constant";

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
		return err.getResponse();
	}
	console.error(err);
	return c.text(GLOBAL_MESSAGE.ERROR, 500);
};
