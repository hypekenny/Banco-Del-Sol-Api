import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from 'src/account/account.module';
import { TransactionsController } from './transactions.controller';
import { Transactions } from './transactions.entity';
import { TransactionsService } from './transactions.service';

@Module({
  imports: [AccountModule, TypeOrmModule.forFeature([Transactions])],
  controllers: [TransactionsController],
  providers: [TransactionsService],
  exports: [TransactionsService],
})
export class TransactionsModule {}
