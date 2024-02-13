import { eq } from "drizzle-orm";
import { db } from "../../db/db";
import { $offices } from "../../db/schema";
import { OfficeEntity } from "../../db/types";
import { BaseRepository } from "../../types";
import { Office } from "./schema/schema";

type OfficeRepository = {} & BaseRepository<Office, OfficeEntity>;

/**
 * OfficeRepository
 * @description オフィス情報に関するリポジトリ
 * @property findById - オフィスをIDで検索する
 * @property findAll - オフィスを全件取得する
 * @property add - オフィスを作成する
 * @property addAll - オフィスを複数作成する
 */
export const officeRepository = {
	findById: async (id: number): Promise<OfficeEntity | undefined> => {
		return await db.select().from($offices).where(eq($offices.id, id)).limit(1).get();
	},
	findAll: async (): Promise<Array<OfficeEntity>> => {
		return await db.select().from($offices);
	},
	add: async (office: Office): Promise<void> => {
		return await db.insert($offices).values(office);
	},
	addAll: async (offices: Array<Office>): Promise<void> => {
		return await db.insert($offices).values(offices);
	},
} as const satisfies OfficeRepository;
