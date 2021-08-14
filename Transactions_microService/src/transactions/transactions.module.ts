import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from 'src/account/account.module';
import { TransactionsController } from './transactions.controller';
import { Transaction } from './transactions.entity';
import { TransactionsService } from './transactions.service';

@Module({
  imports: [AccountModule, TypeOrmModule.forFeature([Transaction])],
  controllers: [TransactionsController],
  providers: [TransactionsService],
  exports: [TransactionsService],
})
export class TransactionsModule {}
