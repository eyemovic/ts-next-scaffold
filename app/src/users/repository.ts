import { db } from "../drizzle/db";
import * as schema from "../drizzle/schema";
import { User } from "../drizzle/schema";

export const findUsers = async (): Promise<User[]> => {
	return await db.select().from(schema.users);
};
