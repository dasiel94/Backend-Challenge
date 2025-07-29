import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { FirebaseService } from './firebase/services/firebase.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly firebaseService: FirebaseService,
  ) {
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  getHealth(): any {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      version: '1.0.0'
    };
  }

  @Get('test-firebase')
  async testFirebase(): Promise<any> {
    const testDocRef = this.firebaseService.firestore.collection('test').doc('conexion');
    await testDocRef.set({ mensaje: '¡Successful connection!', timestamp: new Date() });
    const doc = await testDocRef.get();
    return doc.exists ? doc.data() : { error: 'The document could not be read' };
  }
}
