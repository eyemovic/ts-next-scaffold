import { db } from "./db";
import { $users } from "./schema";

await db.insert($users).values([
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
