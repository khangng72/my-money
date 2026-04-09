import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [PrismaModule, TransactionModule],
})
export class AppModule {}
