import { Test, TestingModule } from '@nestjs/testing';
import { AccountModule } from '../account/account.module';
import { AppModule } from '../app.module';
import { UserController } from './user.controller';
import { UserModule } from './user.module';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  let spyService: UserService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      imports: [UserModule, AccountModule],
      providers: [UserService],
    }).compile();

    controller = app.get<UserController>(UserController);
    spyService = app.get<UserService>(UserService);
  });

  describe('get user by email', () => {
    it('should call getUserByEmail function', async () => {
      // const email = 'john@hotmail.com';
      const res = '';
      controller.getAllUsers(res);
      expect(spyService.getAll).toHaveBeenCalled();
    });
  });
});
