import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';

class UserServiceMock {
  getUserByEmail(email: string) {
    return {
      email: 'john@hotmail.com',
      dni: 22321654,
      name: 'John',
      lastName: 'Doe',
      birthdate: '12/4/1990',
      phoneNumber: '1121547563',
    };
  }
}

describe('UserService', () => {
  let app: TestingModule;
  let user: UserService;

  beforeEach(async () => {
    const UserServiceProvider = {
      provide: UserService,
      useClass: UserServiceMock,
    };
    app = await Test.createTestingModule({
      providers: [UserServiceProvider],
    }).compile();

    user = app.get<UserService>(UserService);
  });

  it('should get a user by email', async () => {
    const expectedRes = {
      email: 'john@hotmail.com',
      dni: 22321654,
      name: 'John',
      lastName: 'Doe',
      birthdate: '12/4/1990',
      phoneNumber: '1121547563',
    };
    const service = await user.getUserByEmail('john@hotmail.com');
    expect(service).toEqual(expectedRes);
  });
});
