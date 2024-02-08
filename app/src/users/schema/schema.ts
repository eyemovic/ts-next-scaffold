import { Type as T } from "@sinclair/typebox";

export const UserSchema = T.Object({
	id: T.Number(),
	firstName: T.Union([T.String(), T.Null()]),
	givenName: T.Union([T.String(), T.Null()]),
	createdAt: T.Union([T.String(), T.Null()]),
});
