import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { validator } from "hono/validator";
import { z } from "zod";
import { GLOBAL_MESSAGE, OFFICE_MESSAGE } from "../../constant";
import { BaseController, BaseResponse } from "../../types";
import { officeRepository } from "./repository";
import { Office, officeSchema } from "./types";

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
		const office = await officeRepository.findById(id);
		if (!office) {
			return c.json({
				success: false,
				status: 204,
				message: OFFICE_MESSAGE.NOT_FOUND,
			} satisfies BaseResponse<never>);
		}
		return c.json({
			success: true,
			status: 200,
			message: OFFICE_MESSAGE.GET_BY_ID,
			data: office,
		} satisfies BaseResponse<Office>);
	},
	getAll: async (c: Context) => {
		return c.json({
			success: true,
			status: 200,
			message: OFFICE_MESSAGE.GET_ALL,
			data: await officeRepository.findAll(),
		} satisfies BaseResponse<Array<Office>>);
	},
	post: validator("json", (value, c: Context) => {
		const parsed = officeSchema.safeParse(value);
		if (!parsed.success) {
			throw new HTTPException(400, { message: GLOBAL_MESSAGE.INVALID_REQUEST });
		}
		officeRepository.add(parsed.data);
		return c.json({
			success: true,
			status: 201,
			message: OFFICE_MESSAGE.CREATED,
		} satisfies BaseResponse<never>);
	}),
	postMulti: validator("json", (value, c: Context) => {
		const parsed = z.array(officeSchema).safeParse(value);
		if (!parsed.success) {
			throw new HTTPException(400, { message: GLOBAL_MESSAGE.INVALID_REQUEST });
		}
		officeRepository.addAll(parsed.data);
		return c.json({
			success: true,
			status: 201,
			message: OFFICE_MESSAGE.CREATED,
		} satisfies BaseResponse<never>);
	}),
} as const satisfies OfficeController;
