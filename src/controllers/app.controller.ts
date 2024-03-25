import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/core/decorators';

@Controller()
export class AppController {
  constructor() { }

  @Public()
  @Get()
  getHello(): string {
    return 'Hello World';
  }
}