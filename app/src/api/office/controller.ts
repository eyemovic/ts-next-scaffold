import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { validator } from "hono/validator";
import { z } from "zod";
import { GLOBAL_MESSAGE, OFFICE_MESSAGE } from "../../constant";
import { BaseController } from "../../types";
import { officeRepository } from "./repository";
import { officeSchema } from "./schema/schema";

type OfficeController = BaseController & {};

/**
 * OfficeController
 * @description オフィス情報に関するコントローラー
 * @property getById オフィスをIDで検索する
 * @property getAll オフィスを全件取得する
 * @property post オフィスを作成する
 * @property postMulti オフィスを複数作成する
 */
export const officeController = {
	getById: async (c: Context) => {
		const id = parseInt(c.req.param("id"));
		return c.json(await officeRepository.findById(id));
	},
	getAll: async (c: Context) => {
		return c.json(await officeRepository.findAll());
	},
	post: validator("json", (value, c: Context) => {
		const parsed = officeSchema.safeParse(value);
		if (!parsed.success) {
			throw new HTTPException(400, { message: GLOBAL_MESSAGE.INVALID_REQUEST });
		}
		officeRepository.add(parsed.data);
		return c.text(OFFICE_MESSAGE.OFFICE_CREATED);
	}),
	postMulti: validator("json", (value, c: Context) => {
		const parsed = z.array(officeSchema).safeParse(value);
		if (!parsed.success) {
			throw new HTTPException(400, { message: GLOBAL_MESSAGE.INVALID_REQUEST });
		}
		officeRepository.addAll(parsed.data);
		return c.text(OFFICE_MESSAGE.OFFICE_CREATED);
	}),
} as const satisfies OfficeController;
