// @utils
import "dotenv/config";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

const connectionString = process.env.DATABASE_URL;

export const client = postgres(connectionString!, { prepare: false });
export const db = drizzle(client);
