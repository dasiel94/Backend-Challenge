import { Injectable, OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';

@Injectable()
export class FirebaseService implements OnModuleInit {
  private app: admin.app.App;
  public firestore: admin.firestore.Firestore;
  public auth: admin.auth.Auth;

  onModuleInit() {
    if (!admin.apps.length) {
      let credential: admin.credential.Credential;

      // Use environment variables for production (Render)
      if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_CLIENT_EMAIL) {
        const serviceAccount: ServiceAccount = {
          projectId: process.env.FIREBASE_PROJECT_ID,
          privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        };
        credential = admin.credential.cert(serviceAccount);
      } else {
        // Fallback to local file for development
        const path = require('path');
        credential = admin.credential.cert(
          require(path.resolve(process.cwd(), 'firebase-service-account.json')) as ServiceAccount,
        );
      }

      this.app = admin.initializeApp({
        credential,
      });
      this.firestore = admin.firestore();
      this.auth = admin.auth();
    }
  }
} 