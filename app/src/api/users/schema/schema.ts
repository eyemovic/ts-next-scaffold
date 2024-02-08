import { Type as T } from "@sinclair/typebox";

export const UserSchema = T.Object({
	id: T.Number(),
	firstName: T.String(),
	givenName: T.String(),
	createdAt: T.String(),
});
