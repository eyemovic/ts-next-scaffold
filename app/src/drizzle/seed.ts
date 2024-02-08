import { db } from "./db";
import * as schema from "./schema";

await db.insert(schema.users).values([
	{
		firstName: "Taro",
		givenName: "Yamada",
	},
	{
		firstName: "Hanako",
		givenName: "Suzuki",
	},
	{
		firstName: "Jiro",
		givenName: "Tanaka",
	},
]);

console.log("Seeding complete.");
