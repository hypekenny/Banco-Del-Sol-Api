import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsModule } from './transactions/transactions.module';
import { Transaction } from './transactions/transactions.entity';

@Module({
  imports: [
    TransactionsModule,
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      database: 'banco-del-sol',
      entities: [Transaction],
      synchronize: true,
      useUnifiedTopology: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
