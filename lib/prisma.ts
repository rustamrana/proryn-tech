import { PrismaClient } from "@prisma/client";

/**
 * Production-safe Prisma client singleton.
 *
 * In development, Next.js hot-reloading repeatedly re-evaluates modules, which
 * would otherwise create a new PrismaClient (and a new pool of DB connections)
 * on every reload and quickly exhaust the database connection limit. Caching the
 * client on `globalThis` avoids that. In production a single instance is created
 * per server/lambda instance.
 *
 * SERVER-ONLY: never import this from a Client Component. It is used exclusively
 * inside server-side API routes so database credentials never reach the browser.
 */

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
