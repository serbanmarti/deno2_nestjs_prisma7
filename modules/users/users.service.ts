import { Injectable } from "@nestjs/common";

import { PrismaService } from "@libs/prisma/service";
import type { User } from "@libs/prisma/types";

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<User[]> {
    return await this.prismaService.user.findMany();
  }

  async findById(id: string): Promise<User | null> {
    return await this.prismaService.user.findUnique({
      where: { id },
    });
  }
}
