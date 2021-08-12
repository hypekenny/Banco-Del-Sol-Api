import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionSchema } from './transactions.model';
import { TransactionsService } from './transactions.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Transaction', schema: TransactionSchema },
    ]),
  ],
  controllers: [TransactionsController],
  exports: [TransactionsService],
  providers: [TransactionsService],
})
export class TransactionsModule {}
