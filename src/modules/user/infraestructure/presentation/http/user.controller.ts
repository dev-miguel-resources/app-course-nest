import { Body, Controller, Post } from '@nestjs/common';

@Controller('users')
export class UserController {
  @Post()
  async insert(@Body() body: any) {
    return body;
  }
}
