import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsModule } from './transactions/transactions.module';
import { Transactions } from './transactions/transactions.entity';
import { AccountModule } from './account/account.module';
import { Accounts } from './account/account.entity';

@Module({
  imports: [
    TransactionsModule,
    AccountModule,
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      database: 'banco-del-sol',
      entities: [Transactions, Accounts],
      synchronize: true,
      useUnifiedTopology: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
