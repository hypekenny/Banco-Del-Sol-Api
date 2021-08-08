import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AccountModule } from './account/account.module';
import { AuthStrategy } from './auth/auth.strategy';

@Module({
  imports: [
    AccountModule,
    UserModule,
    MongooseModule.forRoot('mongodb://localhost/banco-del-sol', {
      autoCreate: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AuthStrategy],
})
export class AppModule {}
