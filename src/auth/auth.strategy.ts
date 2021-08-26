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
      secretOrKey: secretOrKey,
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
