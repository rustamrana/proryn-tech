/**
 * Seed / reset the bootstrap admin user.
 *
 * Credentials come from env vars so no password is hardcoded:
 *   ADMIN_EMAIL     (default: admin@proryntech.com)
 *   ADMIN_PASSWORD  (required — the script refuses to run without it)
 *   ADMIN_NAME      (default: PRORYN Admin)
 *
 * Idempotent: upserts by email and (re)sets the password hash.
 *
 * Usage (PowerShell):
 *   $env:DATABASE_URL='...'; $env:ADMIN_PASSWORD='StrongPass#2026'; node prisma/seed-admin.mjs
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = (process.env.ADMIN_EMAIL || "admin@proryntech.com").toLowerCase();
  const name = process.env.ADMIN_NAME || "PRORYN Admin";
  const password = process.env.ADMIN_PASSWORD;

  if (!password || password.length < 8) {
    throw new Error("ADMIN_PASSWORD env var is required (min 8 chars).");
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await prisma.adminUser.upsert({
    where: { email },
    update: { name, passwordHash, role: "ADMIN", isActive: true },
    create: { email, name, passwordHash, role: "ADMIN", isActive: true },
  });

  console.log(`Admin user ready: ${user.email} (role=${user.role})`);
}

main()
  .catch((e) => {
    console.error("Admin seed failed:", e.message);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
