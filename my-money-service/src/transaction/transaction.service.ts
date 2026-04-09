import { Injectable } from '@nestjs/common';

import { PrismaService } from 'prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateTransactionDto) {
    return this.prisma.transaction.create({
      data: {
        amount: dto.amount,
        type: dto.type,
        note: dto.note,
        date: new Date(dto.date),
        categoryId: dto.categoryId,
      },
      include: {
        category: true,
      },
    });
  }

  async findAll() {
    return this.prisma.transaction.findMany({
      include: {
        category: true,
      },
      orderBy: {
        date: 'desc',
      },
    });
  }

  async findByMonth(year: number, month: number) {
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 1);

    return this.prisma.transaction.findMany({
      where: {
        date: {
          gte: start,
          lt: end,
        },
      },
      include: {
        category: true,
      },
      orderBy: {
        date: 'desc',
      },
    });
  }

  async getMonthlySummary(year: number, month: number) {
    const transactions = await this.findByMonth(year, month);

    const income = transactions
      .filter((t) => t.type === 'INCOME')
      .reduce((sum, t) => sum + t.amount, 0);

    const expense = transactions
      .filter((t) => t.type === 'EXPENSE')
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      income,
      expense,
      saving: income - expense,
    };
  }
}
