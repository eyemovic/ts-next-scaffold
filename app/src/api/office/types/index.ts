import { z } from "zod";

/**
 * Office
 * @description Controller, Serviceレイヤーで利用する
 */
export type Office = z.infer<typeof officeSchema>;
export const officeSchema = z.object({
	name: z.string(),
});
