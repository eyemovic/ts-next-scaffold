import { tbValidator } from "@hono/typebox-validator";
import { Type as T } from "@sinclair/typebox";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import app from "..";
import { GLOBAL_MESSAGE, USER_MESSAGE } from "../../constant";
import { Office } from "../../db/types";
import { JsonResponse } from "../../types";
import { OfficeRepository } from "./repository";
import { officeSchema } from "./schema/schema";

/**
 * OfficeController
 * @description オフィス情報に関するコントローラー
 */
const OfficeController = {
	getOfficeById: async (c: Context): JsonResponse<Office | undefined> => {
		const id = parseInt(c.req.param("id"));
		return c.json(await OfficeRepository.findOfficeById(id));
	},
	getOffices: async (c: Context): JsonResponse<Array<Office>> => {
		return c.json(await OfficeRepository.findOffices());
	},
	postOffice: tbValidator("json", officeSchema, (result, c: Context): Response => {
		if (!result.success) {
			throw new HTTPException(400, { message: GLOBAL_MESSAGE.INVALID_REQUEST });
		}
		OfficeRepository.createOffice(result.data);
		return c.text(USER_MESSAGE.USER_CREATED);
	}),
	postOffices: tbValidator("json", T.Array(officeSchema), (result, c: Context): Response => {
		if (!result.success) {
			throw new HTTPException(400, { message: GLOBAL_MESSAGE.INVALID_REQUEST });
		}
		OfficeRepository.createOffices(result.data);
		return c.text(USER_MESSAGE.USER_CREATED);
	}),
} as const;

/**
 * Routing
 */
app
	.get("/office/:id", OfficeController.getOfficeById)
	.get("/offices", OfficeController.getOffices)
	.post("/office", OfficeController.postOffice)
	.post("/offices", OfficeController.postOffices);
