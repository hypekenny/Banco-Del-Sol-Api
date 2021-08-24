import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:
        '-----BEGIN CERTIFICATE-----\nMIIDHDCCAgSgAwIBAgIIMwtDN/JKHEYwDQYJKoZIhvcNAQEFBQAwMTEvMC0GA1UE\nAxMmc2VjdXJldG9rZW4uc3lzdGVtLmdzZXJ2aWNlYWNjb3VudC5jb20wHhcNMjEw\nODIwMDkyMDI0WhcNMjEwOTA1MjEzNTI0WjAxMS8wLQYDVQQDEyZzZWN1cmV0b2tl\nbi5zeXN0ZW0uZ3NlcnZpY2VhY2NvdW50LmNvbTCCASIwDQYJKoZIhvcNAQEBBQAD\nggEPADCCAQoCggEBANjUnKhlZSBiNDYlfuWUrqGxG43MxVdiyTHOMcyb9LJqHmmu\nhr08wf2LsBnIwsSCFu80Xq7lpEr+nMiqaeVnyCTenFku76JseteR4P/dOdmtKchC\nDB6PFRXkW4+JKDgT6PLhsq1NSk68ae74SjAsoQRTi5bfnnxUCXc3+oy8/mrXtzA9\nhh2P2Yc29zzlv7ByI1O7sFCCajoX+tqEqiLTeVMdItjPh9wjQxNreMb41OGYo3zv\nKoGY9vqgPio8hmRQVJfUbN8qYFb7QmMKafAbZay9FdS+0GdZEWzBMoZ0ICv+3ZmN\nNwScyY//MRK1mcGPtLVVNMuquckyl1fux9T5ntkCAwEAAaM4MDYwDAYDVR0TAQH/\nBAIwADAOBgNVHQ8BAf8EBAMCB4AwFgYDVR0lAQH/BAwwCgYIKwYBBQUHAwIwDQYJ\nKoZIhvcNAQEFBQADggEBAJbi+Yw/zvLWlAnMYgp97se4zvHBwm5vVB3H/Iai6Kt2\na+hCeA3Zso0oOrS4Na3hEKUQSdJ3EBJQb7ofJvi9S+rJgbum2ZJewUKbm+IKYjam\nGOMfJaQ+jZHYsXWPlQNKpybBfGlwplK3MR0qQQUgWg5PKF0k779YV9C38I+JU43O\nLoJUAGyWf5eEAC7Juy5u5LOGfT9YaRxdIHHU9n15M5jOrjlDwKLX3q0DWi1VcAdn\n3MVmvPD9McbXdGNkA/kUIKl+OLi+neY8Bv/96R/LijT9SiQMISp9JUWc22iC1iyq\ndkVXWfazRDtNwDaOdiKnsa7NLcX2Xy/++RT0ZL3caV4=\n-----END CERTIFICATE-----\n',
    });
  }
  async validate(payload) {
    console.log('kevin');
    const user = {
      user_id: payload.user_id,
      email: payload.email,
    };
    return user;
  }
}
