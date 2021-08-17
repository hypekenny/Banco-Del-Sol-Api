import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:
        '-----BEGIN CERTIFICATE-----\nMIIDHDCCAgSgAwIBAgIILyrHQV3qOo0wDQYJKoZIhvcNAQEFBQAwMTEvMC0GA1UE\nAxMmc2VjdXJldG9rZW4uc3lzdGVtLmdzZXJ2aWNlYWNjb3VudC5jb20wHhcNMjEw\nODEyMDkyMDI0WhcNMjEwODI4MjEzNTI0WjAxMS8wLQYDVQQDEyZzZWN1cmV0b2tl\nbi5zeXN0ZW0uZ3NlcnZpY2VhY2NvdW50LmNvbTCCASIwDQYJKoZIhvcNAQEBBQAD\nggEPADCCAQoCggEBALBteb88GBSo02f0Fo3u0hPahGZH0PWzIOFdADiJoSzyxlw5\nRRcuJWQ2dsuxDc1DOQoAZX47If5ycbWK9R1M319QXpTnVbo5G7buowRb/5WjpsUY\nJUDPGoWT09axE/SmruLoSPIRIyAWmlKdznbwEZjCGQFNMr7YJaBNfQ+8rNc11te6\nITo9gbK60gn2CUC91Su+N3d2xcUFo5nTgTXHXkcGbFenEs9B+8H4OS3y1/+z1lEA\nOR7I/YaatKDjZLRX7jxFYMvL+4FhOc8/xC/xEntUa0FPS/2Jz1Nrlawa29dCNVfv\nfgNSGF199oJsiqDxW9x4T8Uoof/Mz0SVcqfprckCAwEAAaM4MDYwDAYDVR0TAQH/\nBAIwADAOBgNVHQ8BAf8EBAMCB4AwFgYDVR0lAQH/BAwwCgYIKwYBBQUHAwIwDQYJ\nKoZIhvcNAQEFBQADggEBAKk2+0J2DiMbGNOmc9MLRralbY0k8LrnHye2AU4wpIk0\nZtguEX+zilxI1GEo45wb9NbHJE9u93ZkovnMayomP4uiXzM6F2CV+PQSpiZWWKk2\nQ3/yWEV5bh4FrdWujnN/mPCfs9O0a6gvhLDf4a7clNMR2MJid1kOyPwnkHzJTY35\nwKWccougeJtD+SKE+47Tu6zPSUjQ8Dx7hEusQTqwLQFgXvDVc7mXWzPKIrC6PDUg\n0itctBxY/M9Db3e5AAqKhFoYMSqgfHNRxz/IVAnhBWn+mZDKJ9gnkK9WfOQcSg9Q\nYCQdkmjcds33HXb67OhJrNP0Ca5GDdd3/LPm5lLB9HM=\n-----END CERTIFICATE-----\n',
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
