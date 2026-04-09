export class CreateTransactionDto {
  amount: number;
  type: 'INCOME' | 'EXPENSE' | 'SAVING';
  note?: string;
  date: string;
  categoryId?: string;
}
