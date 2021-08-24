import { Test, TestingModule } from '@nestjs/testing';
import { ContactsService } from './contacts.service';

describe('ContactsService', () => {
  class ContactsServiceMock {
    getContact(email: string) {
      return {
        email: 'john@hotmail.com',
        name: 'John',
        lastName: 'Doe',
        cvu: '1121547563',
      };
    }
  }

  let app: TestingModule;
  let contact: ContactsService;

  beforeEach(async () => {
    const ContactsServiceProvider = {
      provide: ContactsService,
      contactsClass: ContactsServiceMock,
    };
    app = await Test.createTestingModule({
      providers: [ContactsServiceProvider],
    }).compile();

    contact = app.get<ContactsService>(ContactsService);
  });

  it('should get a contact by email', async () => {
    const expectedRes = {
      email: 'john@hotmail.com',
      name: 'John',
      lastName: 'Doe',
      cvu: '1121547563',
    };
    const service = await contact.getContact('john@hotmail.com');
    expect(service).toEqual(expectedRes);
  });
});
