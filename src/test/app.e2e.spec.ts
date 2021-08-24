import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { INestApplication, HttpService, HttpModule } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { of } from 'rxjs';
import { UserService } from '../user/user.service';
import { AccountService } from '../account/account.service';
import { ContactsService } from '../contacts/contacts.service';

describe('AppController (e2e)', () => {
  let app;
  let httpService: HttpService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, HttpModule],
      providers: [UserService, AccountService],
    }).compile();

    app = moduleFixture.createNestApplication();
    httpService = moduleFixture.get<HttpService>(HttpService);
    await app.init();
  });

  it('should get a contact', async () => {
    const result: AxiosResponse = {
      data: {
        email: 'john@hotmail.com',
        name: 'John',
        lastName: 'Doe',
        cvu: '2232115465487',
        birthdate: '12/4/1990',
        phoneNumber: '1121547563',
        dni: 22321654,
      },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(result));
    const expected = {
      email: 'john@hotmail.com',
      name: 'John',
      lastName: 'Doe',
      cvu: '2232115465487',
      birthdate: '12/4/1990',
      phoneNumber: '1121547563',
      dni: 22321654,
    };
    const response = await request(app.getHttpServer())
      .get('/api/user/?email=john@hotmail.com')
      .expect(200);
    expect(response.text).toEqual(expected);
  });
});
