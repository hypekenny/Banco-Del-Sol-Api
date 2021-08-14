import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsModule } from './transactions/transactions.module';
import { Transaction } from './transactions/transactions.entity';
import { AccountModule } from './account/account.module';
import { Account } from './account/account.entity';

@Module({
  imports: [
    TransactionsModule,
    AccountModule,
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      database: 'banco-del-sol',
      entities: [Transaction, Account],
      synchronize: true,
      useUnifiedTopology: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
