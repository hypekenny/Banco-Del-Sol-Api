import { Module } from '@nestjs/common';
import { MongooseModule } from 'Transactions_microService/node_modules/@nestjs/mongoose';
import { ContactsController } from './contacts.controller';
import { ContactsSchema } from './contacts.model';
import { ContactsService } from './contacts.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Account', schema: ContactsSchema }]),
  ],
  controllers: [ContactsController],
  providers: [ContactsService],
})
export class ContactsModule {}
