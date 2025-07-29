import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../../firebase/services/firebase.service';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UsersService {
  private readonly collectionName = 'users';

  constructor(private readonly firebaseService: FirebaseService) {
  }

  async createUser(createUserDto: CreateUserDto) {
    const { email, name } = createUserDto;
    const userRef = this.firebaseService.firestore.collection(this.collectionName).doc(email);
    const userDoc = await userRef.get();
    if (userDoc.exists) {
      throw new Error('User already exists');
    }
    await userRef.set({ email, name, createdAt: new Date() });
    return { email, name };
  }

  async findByEmail(email: string) {
    const userRef = this.firebaseService.firestore.collection(this.collectionName).doc(email);
    const userDoc = await userRef.get();
    if (!userDoc.exists) {
      return null;
    }
    return userDoc.data();
  }

  async validateUserByEmail(email: string) {
    return this.findByEmail(email);
  }
} 