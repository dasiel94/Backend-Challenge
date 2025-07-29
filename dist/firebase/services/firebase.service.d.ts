import { OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';
export declare class FirebaseService implements OnModuleInit {
    private app;
    firestore: admin.firestore.Firestore;
    auth: admin.auth.Auth;
    onModuleInit(): void;
}
