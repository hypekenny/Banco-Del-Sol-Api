import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from './account.service';

describe('AccountService', () => {
  class AccountServiceMock {
    getAccount(email: string) {
      return {
        email: 'john@hotmail.com',
        balance: { amount: 200, history: [] },
        cvu: '221132123213',
      };
    }
  }
  let app: TestingModule;
  let account: AccountService;

  beforeEach(async () => {
    const AccountServiceProvider = {
      provide: AccountService,
      useClass: AccountServiceMock,
    };
    app = await Test.createTestingModule({
      providers: [AccountServiceProvider],
    }).compile();

    account = app.get<AccountService>(AccountService);
  });

  it('should get the account', async () => {
    const expectedRes = {
      email: 'john@hotmail.com',
      balance: { amount: 200, history: [] },
      cvu: '221132123213',
    };
    const service = await account.getAccount('john@hotmail.com');
    expect(service).toEqual(expectedRes);
  });

  /*  it('should create the account', async () => {
    const expectedRes = {
      email: 'john@hotmail.com',
      balance: { amount: 0, history: [] },
      cvu: '',
      condition: '',
    };
    const service = await account.createAccount({
      email: 'john@hotmail.com',
      cvu: '',
      balance: { amount: 0, history: [] },
      condition: 'active',
    });
    expect(service).toEqual(expectedRes);
  }); */
});
