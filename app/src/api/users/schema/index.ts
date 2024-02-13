import { z } from "zod";

export type User = z.infer<typeof userSchema>;
export const userSchema = z.object({
	firstName: z.string(),
	givenName: z.string(),
});
