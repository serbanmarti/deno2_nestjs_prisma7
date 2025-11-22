import { Module } from "@nestjs/common";

import { IndexController } from "./index.controller.ts";

@Module({
  controllers: [IndexController],
})
export class IndexModule {}
