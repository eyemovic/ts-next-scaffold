import { eq } from "drizzle-orm";
import { db } from "../../db/db";
import { $offices } from "../../db/schema";
import { Office } from "../../db/types";

/**
 * OfficeRepository
 * @description オフィス情報に関するリポジトリ
 */
export const OfficeRepository = {
	/**
	 * オフィスをIDで検索する
	 */
	findOfficeById: async (id: number): Promise<Office | undefined> => {
		return await db.select().from($offices).where(eq($offices.id, id)).limit(1).get();
	},
	/**
	 * オフィスを全件取得する
	 */
	findOffices: async (): Promise<Array<Office>> => {
		return await db.select().from($offices);
	},
	/**
	 * オフィスを作成する
	 */
	addOffice: async (office: Office): Promise<void> => {
		return await db.insert($offices).values(office);
	},
	/**
	 * オフィスを複数作成する
	 */
	addOffices: async (offices: Array<Office>): Promise<void> => {
		return await db.insert($offices).values(offices);
	},
} as const;
