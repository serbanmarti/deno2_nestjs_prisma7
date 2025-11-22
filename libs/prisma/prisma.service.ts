import { Injectable, type OnModuleDestroy, type OnModuleInit } from "@nestjs/common";
import { env } from "prisma/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient } from "./extras/client.ts";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly pool: Pool;

  constructor() {
    const pool = new Pool({ connectionString: env("DATABASE_URL") });
    const adapter = new PrismaPg(pool);

    super({
      errorFormat: "minimal",
      adapter,
    });

    this.pool = pool;
  }

  async onModuleInit() {
    await this.$connect();

    // Verify the connection is actually working
    await this.$queryRaw`SELECT 1`;
  }

  async onModuleDestroy() {
    await this.$disconnect();
    await this.pool.end();
  }
}
