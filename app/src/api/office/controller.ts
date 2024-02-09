import { tbValidator } from "@hono/typebox-validator";
import { Type as T } from "@sinclair/typebox";
import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import app from "..";
import { GLOBAL_MESSAGE, USER_MESSAGE } from "../../constant";
import { OfficeRepository } from "./repository";
import { officeSchema } from "./schema/schema";

/**
 * OfficeController
 * @description オフィス情報に関するコントローラー
 * 関数版
 */
const getById = async (c: Context) => {
	const id = parseInt(c.req.param("id"));
	return c.json(await OfficeRepository.findOfficeById(id));
};

const getAll = async (c: Context) => {
	return c.json(await OfficeRepository.findOffices());
};

const post = tbValidator("json", officeSchema, (result, c: Context) => {
	if (!result.success) {
		throw new HTTPException(400, { message: GLOBAL_MESSAGE.INVALID_REQUEST });
	}
	OfficeRepository.createOffice(result.data);
	return c.text(USER_MESSAGE.USER_CREATED);
});

const postMulti = tbValidator("json", T.Array(officeSchema), (result, c: Context) => {
	if (!result.success) {
		throw new HTTPException(400, { message: GLOBAL_MESSAGE.INVALID_REQUEST });
	}
	OfficeRepository.createOffices(result.data);
	return c.text(USER_MESSAGE.USER_CREATED);
});

/**
 * Routing
 */
app.get("/office/:id", getById).get("/offices", getAll).post("/office", post).post("/offices", postMulti);
