import { spawnSync } from "node:child_process";
import "./ensure-env.mjs";
import { backendRoot } from "./ensure-env.mjs";

const prismaArgs = process.argv.slice(2);

if (prismaArgs.length === 0) {
  console.error("Usage: node scripts/run-prisma.mjs <prisma-command> [args...]");
  process.exit(1);
}

function run(command, args) {
  const result = spawnSync(command, args, {
    cwd: backendRoot,
    stdio: "inherit",
    env: process.env,
    shell: process.platform === "win32",
  });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

// Always generate client before migrate/seed (fixes "did not initialize yet")
if (prismaArgs[0] === "migrate" || prismaArgs[0] === "db") {
  run("npx", ["prisma", "generate"]);
}

run("npx", ["prisma", ...prismaArgs]);
