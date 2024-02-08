import { Type as T } from "@sinclair/typebox";

export const officeSchema = T.Object({
	id: T.Number(),
	name: T.String(),
	createdAt: T.String(),
});
