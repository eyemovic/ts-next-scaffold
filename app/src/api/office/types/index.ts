import { z } from "zod";

export type Office = z.infer<typeof officeSchema>;
export const officeSchema = z.object({
	name: z.string(),
});
