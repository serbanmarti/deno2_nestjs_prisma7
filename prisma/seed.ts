import "dotenv/config";
import { PrismaClient } from "@libs/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { env } from "prisma/config";

const pool = new Pool({ connectionString: env("DATABASE_URL") });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  errorFormat: "minimal",
  adapter,
});

async function main() {
  console.log("Seeding test data...");

  console.log("\n----------------------------------------\n\n");

  await prisma.$transaction(async (tx) => {
    console.log("Seeding users...");

    await tx.user.createMany({
      skipDuplicates: true,
      data: [
        {
          id: "a9699897-4648-4124-abf0-e0504a375f44",
          name: "John Doe",
          email: "john.doe@example.com",
        },
        {
          id: "fcc17b7c-431b-484c-bf4a-24296fea976d",
          name: "Jane Doe",
          email: "jane.doe@example.com",
        },
      ],
    });

    console.log("Seeded users!");
  });

  console.log("\n----------------------------------------\n\n");

  console.log("Done seeding test data!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    Deno.exit(1);
  });
