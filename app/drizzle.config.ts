import { Config, defineConfig } from "drizzle-kit";

export default defineConfig({
	schema: "./src/db/schema.ts",
	verbose: true,
	strict: true,
} satisfies Config);
