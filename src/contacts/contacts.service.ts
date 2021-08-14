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

  async getContact(email: string): Promise<Contacts> {
    try {
      const findContact = await this.contactsModel.findOne({
        email: email,
      });
      return findContact;
    } catch (error) {
      console.error(error);
    }
  }

  async getAll(): Promise<Contacts[]> {
    try {
      const contacts = await this.contactsModel.find();
      return contacts;
    } catch (error) {
      console.error(error);
    }
  }

  async createContact(contact, cvu) {
    try {
      const newContact = await this.contactsModel.create({
        email: contact.email,
        name: contact.name,
        lastName: contact.lastName,
        cvu: cvu,
      });
      return newContact;
    } catch (error) {
      console.error(error);
    }
  }
}
