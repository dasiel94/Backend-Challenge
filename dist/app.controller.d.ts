import { AppService } from './app.service';
import { FirebaseService } from './firebase/services/firebase.service';
export declare class AppController {
    private readonly appService;
    private readonly firebaseService;
    constructor(appService: AppService, firebaseService: FirebaseService);
    getHello(): string;
    getHealth(): any;
    testFirebase(): Promise<any>;
}
