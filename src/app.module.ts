import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AccountModule } from './account/account.module';
import { AuthStrategy } from './auth/auth.strategy';
import { ContactsModule } from './contacts/contacts.module';

const {MONGODB_URI} = process.env;

@Module({
  imports: [
    ContactsModule,
    AccountModule,
    UserModule,
    MongooseModule.forRoot(MONGODB_URI, {
      autoCreate: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AuthStrategy],
})
export class AppModule {}
