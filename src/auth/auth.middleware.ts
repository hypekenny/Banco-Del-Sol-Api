import { Injectable, NestMiddleware } from '@nestjs/common';
import { request, response } from 'express';
import * as firebase from 'firebase-admin';
import { url } from 'inspector';
import * as serviceAccount from './firebaseServiceAccount.json';

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
  constructor() {
    this.defaultApp = firebase.initializeApp({
      credential: firebase.credential.cert(firebase_params),
      databaseURL: 'https://banco-del-sol-411e6-default-rtdb.firebaseio.com',
    });
  }
  use(req: any, res: any, next: () => void) {
    const token = req.headers.authorization;
    if (token != null && token != '') {
      this.defaultApp
        .auth()
        .verifyidToken(token.replace('Bearer ', ''))
        .then(async (decodedToken) => {
          const user = {
            email: decodedToken.email,
          };
          req['user'] = user;
          next();
        })
        .catch((error) => {
          console.log(error);
          // this.accessDenied(req.url, res);
        });
    } else next();
  }
}

// private accessDenied(url:string ,  res: Response){
// response.status(403).json({
//   statusCode : 403 ,
//   timestamp : new Date().toISOString(),
//   path : url,
//   message : 'Access Denied'
// })
// }
