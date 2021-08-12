import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { secretOrKey } from './secret.key';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // secretOrKey:
      //   '-----BEGIN CERTIFICATE-----\nMIIDHDCCAgSgAwIBAgIIYU8JOJD88JEwDQYJKoZIhvcNAQEFBQAwMTEvMC0GA1UE\nAxMmc2VjdXJldG9rZW4uc3lzdGVtLmdzZXJ2aWNlYWNjb3VudC5jb20wHhcNMjEw\nODA0MDkyMDI0WhcNMjEwODIwMjEzNTI0WjAxMS8wLQYDVQQDEyZzZWN1cmV0b2tl\nbi5zeXN0ZW0uZ3NlcnZpY2VhY2NvdW50LmNvbTCCASIwDQYJKoZIhvcNAQEBBQAD\nggEPADCCAQoCggEBAJspHgKR+g/o/8HIIrpeW6otU2r6weLBVjsLdL9rn7nTSrA0\nkb2eYgX94xP8DpktItglSzyowAgGcJ6M3qg4CHE1fYck2qmPF5KYAZb7FsTWw9nH\nJIJn/XOYnehF7PSjrnnG0AI4DJzW9SRRGnkE122S98M2gswg53RCh9ByI3ptQ0+j\nfMq0lxemPXzKJud07PWVMydMWdAAAR7M4xPfAf2ZZise+2DhMMmRS7DWZDzRGtCv\n5bd16h23XEFZ7jLJewdEO5sg8qayhN1tDTcmRxye4j7LOqPT+foW266hPYfgc3kg\n7R6bpAOAfW409SUnj+RK97SOCiswMV6k1+Rd0gECAwEAAaM4MDYwDAYDVR0TAQH/\nBAIwADAOBgNVHQ8BAf8EBAMCB4AwFgYDVR0lAQH/BAwwCgYIKwYBBQUHAwIwDQYJ\nKoZIhvcNAQEFBQADggEBAIua6a8L57YgtqJq59lfRTbbEY/A0Gfcfn3dsn90MC9h\nRO4yfztdX3RPQLLIzsigI6myhRuEG9AmVb9+L4nWaGbtX5S2bInNGrge5d67FUGu\nlL+ikHuz2VKrXnOAeCm7llSOZ56MHI5oP7sYGGOMs8c4Mv0RGkQzp2xrxMLdo8c3\nhY40tT8H2fpcAxdc4MYS7Vr+AbBucz2B25by6V9luX8VUW0GAbDu9g/NB/uAVBct\n7otv+h3VlWZkDg0E3RDDiZGQTWIhbyYF51cR8BRc8ZFa2mW4/y2Qm12BGFG/ZCkB\nBGjQprBBLMrgXh1y9xWZsqAdvm0+Oa/GBeaE+I1Xr1o=\n-----END CERTIFICATE-----\n',
      secretOrKey: secretOrKey,
    });
    //console.log(configService.get<string>('SECRET_OR_KEY'));
  }

  async validate(payload) {
    const user = {
      user_id: payload.user_id,
      email: payload.email,
    };
    return user;
  }
}
