import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as firebase from 'firebase-admin';
import * as serviceAccount from './firebaseServiceAccount.json';
import { UserService } from 'src/user/user.service';

const firebase_params = {
  type: serviceAccount.type,
  projectId: serviceAccount.project_id,
  privateKeyId: serviceAccount.private_key_id,
  privateKey: serviceAccount.private_key,
  clientEmail: serviceAccount.client_email,
  clientId: serviceAccount.client_id,
  authUri: serviceAccount.auth_uri,
  tokenUri: serviceAccount.token_uri,
  authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
};

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private defaultApp: any;
  constructor(private readonly userService: UserService) {
    this.defaultApp = firebase.initializeApp({
      credential: firebase.credential.cert(firebase_params),
      databaseURL: 'https://banco-del-sol-411e6-default-rtdb.firebaseio.com',
    });
  }
  use(req: Request, res: Response, next: () => void) {
    try {
      console.log('RRRRRRRRRRRRRRRRRR', req.headers.authorization);
      const token = req.headers.authorization;
      console.log('LLLLLLLLLLLLL', req.query);
      if (token != null && token != '') {
        console.log('AAAAAAAAAA');
        this.defaultApp
          .auth()
          .verifyIdToken(token.replace('Bearer ', ''))
          .then(async (decodedToken) => {
            const user = await this.userService.getUserByEmail(
              decodedToken.email,
            );
            console.log('JJJJJJJJJJJJ', user);
            req['user'] = user;
            next();
          })
          .catch((error) => {
            console.log(error);
            this.accessDenied(req.url, res);
          });
      } else return res.status(401).json({ message: 'token not found' });
    } catch (error) {
      console.log(error);
    }
  }
  private accessDenied(url: string, res: Response) {
    res.status(403).json({
      statusCode: 403,
      timestamp: new Date().toISOString(),
      path: url,
      message: 'Access Denied',
    });
  }
}
