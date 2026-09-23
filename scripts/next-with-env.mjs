import { existsSync } from "node:fs";
import { spawn } from "node:child_process";
import { join } from "node:path";

if (typeof process.loadEnvFile === "function" && existsSync(".env")) process.loadEnvFile(".env");

const command = process.argv[2];
if (command !== "dev" && command !== "start") {
  console.error("Use: node scripts/next-with-env.mjs <dev|start>");
  process.exit(1);
}

const port = Number(process.env.PORT || 3000);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  console.error("PORT must be a whole number between 1 and 65535.");
  process.exit(1);
}

const nextCli = join(process.cwd(), "node_modules", "next", "dist", "bin", "next");
const child = spawn(process.execPath, [nextCli, command, "--port", String(port)], { stdio: "inherit", env: process.env });
child.on("exit", (code) => process.exit(code ?? 1));
