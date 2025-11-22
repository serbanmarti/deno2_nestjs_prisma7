import { Controller, Get, NotFoundException, Param, ParseUUIDPipe } from "@nestjs/common";

import type { User } from "@libs/prisma/types";

import { UsersService } from "./users.service.ts";

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async listUsers(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Get(":userId")
  async getUser(@Param("userId", ParseUUIDPipe) userId: string): Promise<User> {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;
  }
}
