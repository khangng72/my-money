import { Controller, Get } from '@nestjs/common';

@Controller('/transactions')
export class TransactionController {
  @Get()
  getTransaction(): string[] {
    return ['t1', 't2', 't3'];
  }
}
