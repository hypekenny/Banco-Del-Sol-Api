import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:
        '-----BEGIN CERTIFICATE-----\nMIIDHDCCAgSgAwIBAgIIW9rMLyEvCJwwDQYJKoZIhvcNAQEFBQAwMTEvMC0GA1UE\nAxMmc2VjdXJldG9rZW4uc3lzdGVtLmdzZXJ2aWNlYWNjb3VudC5jb20wHhcNMjEw\nODI4MDkyMDI0WhcNMjEwOTEzMjEzNTI0WjAxMS8wLQYDVQQDEyZzZWN1cmV0b2tl\nbi5zeXN0ZW0uZ3NlcnZpY2VhY2NvdW50LmNvbTCCASIwDQYJKoZIhvcNAQEBBQAD\nggEPADCCAQoCggEBALDQVmxmYNIoANKBYM1+pjgOoYMR3Qh26mC+Ys2Ex+kxffzr\nu0RbOH6A+ZjAg6rqQ+5KNJnPVYjFxyJo5BXC9aPzWf3u2xKGrU6STKH8tiOPSj8w\n/pP5+WWIwP3zKFBTVKgfxXKKKCG8ljFOWGqFp3lGSI3idjN/O/vDtX/nz1I0EZE8\n4fXlBwM7dJZQbF8kHtOqhXn5QE0jBS01obKnBdP1p1PTkgGrQJ/4xtSQhhhhajg6\nkNAqGaCzNmTSEZXao6dNQMwne4JErkbME1MIcJIWJqWeZIxdOid+3LpsExY/Gchi\nKGNz+mUhUFR4Av6DvQ6RbwuIZZUiVrrqxdoYrmMCAwEAAaM4MDYwDAYDVR0TAQH/\nBAIwADAOBgNVHQ8BAf8EBAMCB4AwFgYDVR0lAQH/BAwwCgYIKwYBBQUHAwIwDQYJ\nKoZIhvcNAQEFBQADggEBAJBpJU1XU2WEWeWi5jgmJPE3rrTcMqBJW/tpG3btLyS+\nxOf4/W/onDJCFowfK+Vf6VoCg0JSku9LfW0wMso3fql8CVWFbDSiY0lTnP6LnsYO\nkA7cdRW5yZb17kHV2YFN3RcnDU4ZAJ/ljnDvAbLhTMk/DVeNy9U8u8xzTWjuc7Sg\nx2wSHW6HIFBej+KgfYJ+za0H7x11jQZ2FB/0OF9G3Ad2PJaHmmpyz/WqOBExWCFV\nXA6n4guVQNUSDPkIvngaiQxW3mWF5GJNLhTAkqJk+V4sSIX0PCZhFdnCYGC1Ct59\n+3iFhleAFkJ0+lMXjU5q5JoIO6wRH2KgSMpyvjeiIFo=\n-----END CERTIFICATE-----\n',
    });
  }
  async validate(payload) {
    const user = {
      user_id: payload.user_id,
      email: payload.email,
    };
    return user;
  }
}
