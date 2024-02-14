import { zValidator } from "@hono/zod-validator";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { z } from "zod";
import { GLOBAL_MESSAGE, OFFICE_MESSAGE } from "../../constant";
import { BaseController, BaseResponse } from "../../types";
import { OfficeRepository } from "./repository";
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
export const OfficeController = {
	getById: async (c: Context) => {
		const id = parseInt(c.req.param("id"));
		const office = await OfficeRepository.findById(id);
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
			data: await OfficeRepository.findAll(),
		} satisfies BaseResponse<Array<Office>>);
	},
	post: zValidator("json", officeSchema, (result, c) => {
		if (!result.success) {
			throw new HTTPException(400, { message: GLOBAL_MESSAGE.INVALID_REQUEST });
		}
		OfficeRepository.add(result.data);
		return c.json({
			success: true,
			status: 201,
			message: OFFICE_MESSAGE.CREATED,
		} satisfies BaseResponse<never>);
	}),
	postMulti: zValidator("json", z.array(officeSchema), (result, c: Context) => {
		if (!result.success) {
			throw new HTTPException(400, { message: GLOBAL_MESSAGE.INVALID_REQUEST });
		}
		OfficeRepository.addAll(result.data);
		return c.json({
			success: true,
			status: 201,
			message: OFFICE_MESSAGE.CREATED,
		} satisfies BaseResponse<never>);
	}),
} as const satisfies OfficeController;
