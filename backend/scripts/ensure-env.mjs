import { copyFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { config } from "dotenv";

const backendRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const envPath = resolve(backendRoot, ".env");
const examplePath = resolve(backendRoot, ".env.example");

if (!existsSync(envPath)) {
  if (!existsSync(examplePath)) {
    console.error("Missing backend/.env and backend/.env.example");
    process.exit(1);
  }
  copyFileSync(examplePath, envPath);
  console.log("Created backend/.env from .env.example");
}

const result = config({ path: envPath });
if (result.error) {
  console.error("Failed to load backend/.env:", result.error.message);
  process.exit(1);
}

if (!process.env.DATABASE_URL) {
  const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;
  if (DB_USER && DB_PASSWORD && DB_HOST && DB_PORT && DB_NAME) {
    process.env.DATABASE_URL = `mysql://${DB_USER}:${encodeURIComponent(DB_PASSWORD)}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
  }
}

if (!process.env.DATABASE_URL) {
  console.error(
    "DATABASE_URL is not set. Add it to backend/.env or set DB_HOST, DB_USER, DB_PASSWORD, DB_NAME."
  );
  process.exit(1);
}

export { backendRoot, envPath };
