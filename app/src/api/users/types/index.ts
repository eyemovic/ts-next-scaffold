import { z } from "@hono/zod-openapi";
// import { z } from "zod";

export type User = z.infer<typeof userSchema>;
export const userSchema = z.object({
	firstName: z.string().openapi({ description: "名", example: "太郎" }),
	givenName: z.string().openapi({ description: "姓", example: "山田" }),
});
