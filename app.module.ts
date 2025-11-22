import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";

import { IndexModule } from "./modules/index/index.module.ts";
import { UsersModule } from "./modules/users/users.module.ts";

@Module({
  imports: [
    IndexModule,
    UsersModule,
    RouterModule.register([
      {
        path: "/",
        module: IndexModule,
      },
      {
        path: "/users",
        module: UsersModule,
      },
    ]),
  ],
})
export class AppModule {}
