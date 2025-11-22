import { Module } from "@nestjs/common";

import { PrismaModule } from "@libs/prisma/module";

import { UsersController } from "./users.controller.ts";
import { UsersService } from "./users.service.ts";

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
