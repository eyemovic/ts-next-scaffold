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
	/**
	 * オフィスをIDで検索する
	 */
	getById: async (c: Context) => {
		const id = parseInt(c.req.param("id"));
		return c.json(await OfficeRepository.findOfficeById(id));
	},
	/**
	 * オフィスを全件取得する
	 */
	getAll: async (c: Context) => {
		return c.json(await OfficeRepository.findOffices());
	},
	/**
	 * オフィスを作成する
	 */
	post: tbValidator("json", officeSchema, (result, c: Context) => {
		if (!result.success) {
			throw new HTTPException(400, { message: GLOBAL_MESSAGE.INVALID_REQUEST });
		}
		OfficeRepository.addOffice(result.data);
		return c.text(OFFICE_MESSAGE.OFFICE_CREATED);
	}),
	/**
	 * オフィスを複数作成する
	 */
	postMulti: tbValidator("json", T.Array(officeSchema), (result, c: Context) => {
		if (!result.success) {
			throw new HTTPException(400, { message: GLOBAL_MESSAGE.INVALID_REQUEST });
		}
		OfficeRepository.addOffices(result.data);
		return c.text(OFFICE_MESSAGE.OFFICE_CREATED);
	}),
} as const satisfies BaseController;
