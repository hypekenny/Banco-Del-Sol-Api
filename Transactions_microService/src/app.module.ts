import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionsService } from './transactions/transactions.service';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/banco-del-sol', {
      autoCreate: true,
    }),
    TransactionsModule,
  ],
  controllers: [AppController],
  providers: [AppService, TransactionsService],
})
export class AppModule {}
