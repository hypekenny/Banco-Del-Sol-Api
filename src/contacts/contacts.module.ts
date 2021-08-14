import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactsController } from './contacts.controller';
import { ContactsSchema } from './contacts.model';
import { ContactsService } from './contacts.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Contacts', schema: ContactsSchema }]),
  ],
  controllers: [ContactsController],
  exports: [ContactsService],
  providers: [ContactsService],
})
export class ContactsModule {}
