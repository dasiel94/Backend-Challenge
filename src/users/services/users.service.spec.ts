import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { FirebaseService } from '../../firebase/services/firebase.service';
import { CreateUserDto } from '../dto/create-user.dto';

describe('UsersService', () => {
  let service: UsersService;
  let firebaseService: Partial<FirebaseService>;
  let firestoreMock: any;

  beforeEach(async () => {
    firestoreMock = {
      collection: jest.fn().mockReturnThis(),
      doc: jest.fn().mockReturnThis(),
      get: jest.fn(),
      set: jest.fn(),
    };
    firebaseService = { firestore: firestoreMock } as any;
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: FirebaseService, useValue: firebaseService },
      ],
    }).compile();
    service = module.get<UsersService>(UsersService);
  });

  it('should create a user if not exists', async () => {
    firestoreMock.get.mockResolvedValueOnce({ exists: false });
    firestoreMock.set.mockResolvedValueOnce(undefined);
    const dto: CreateUserDto = { email: 'test@mail.com', name: 'Test' };
    const result = await service.createUser(dto);
    expect(result).toEqual({ email: dto.email, name: dto.name });
    expect(firestoreMock.set).toHaveBeenCalled();
  });

  it('should throw if user already exists', async () => {
    firestoreMock.get.mockResolvedValueOnce({ exists: true });
    const dto: CreateUserDto = { email: 'test@mail.com', name: 'Test' };
    await expect(service.createUser(dto)).rejects.toThrow('User already exists');
  });

  it('should find user by email', async () => {
    firestoreMock.get.mockResolvedValueOnce({ exists: true, data: () => ({ email: 'test@mail.com', name: 'Test' }) });
    const result = await service.findByEmail('test@mail.com');
    expect(result).toEqual({ email: 'test@mail.com', name: 'Test' });
  });

  it('should return null if user not found', async () => {
    firestoreMock.get.mockResolvedValueOnce({ exists: false });
    const result = await service.findByEmail('notfound@mail.com');
    expect(result).toBeNull();
  });
}); 