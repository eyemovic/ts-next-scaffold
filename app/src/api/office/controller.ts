import { tbValidator } from "@hono/typebox-validator";
import { Type as T } from "@sinclair/typebox";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { GLOBAL_MESSAGE, OFFICE_MESSAGE } from "../../constant";
import { BaseController } from "../../types";
import { OfficeRepository } from "./repository";
import { officeSchema } from "./schema/schema";

/**
 * OfficeController
 * @description オフィス情報に関するコントローラー
 */
export const OfficeController = {
	getById: async (c: Context) => {
		const id = parseInt(c.req.param("id"));
		return c.json(await OfficeRepository.findOfficeById(id));
	},
	getAll: async (c: Context) => {
		return c.json(await OfficeRepository.findOffices());
	},
	post: tbValidator("json", officeSchema, (result, c: Context) => {
		if (!result.success) {
			throw new HTTPException(400, { message: GLOBAL_MESSAGE.INVALID_REQUEST });
		}
		OfficeRepository.createOffice(result.data);
		return c.text(OFFICE_MESSAGE.OFFICE_CREATED);
	}),
	postMulti: tbValidator("json", T.Array(officeSchema), (result, c: Context) => {
		if (!result.success) {
			throw new HTTPException(400, { message: GLOBAL_MESSAGE.INVALID_REQUEST });
		}
		OfficeRepository.createOffices(result.data);
		return c.text(OFFICE_MESSAGE.OFFICE_CREATED);
	}),
} as const satisfies BaseController;
