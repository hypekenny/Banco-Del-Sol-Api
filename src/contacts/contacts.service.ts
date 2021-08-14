import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contacts, ContactsDocument } from './contacts.model';

@Injectable()
export class ContactsService {
  constructor(
    @InjectModel('Contacts')
    private readonly contactsModel: Model<ContactsDocument>,
  ) {}

  async getContacts(email: string): Promise<Contacts>;
}
