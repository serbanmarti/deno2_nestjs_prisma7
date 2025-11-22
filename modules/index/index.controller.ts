import { Controller, Get } from "@nestjs/common";

@Controller()
export class IndexController {
  @Get()
  getIndex() {
    return {
      message: "Service is alive!",
    };
  }
}
