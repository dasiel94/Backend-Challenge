import { FirebaseService } from '../../firebase/services/firebase.service';
import { CreateUserDto } from '../dto/create-user.dto';
export declare class UsersService {
    private readonly firebaseService;
    private readonly collectionName;
    constructor(firebaseService: FirebaseService);
    createUser(createUserDto: CreateUserDto): Promise<{
        email: string;
        name: string;
    }>;
    findByEmail(email: string): Promise<FirebaseFirestore.DocumentData | null | undefined>;
    validateUserByEmail(email: string): Promise<FirebaseFirestore.DocumentData | null | undefined>;
}
