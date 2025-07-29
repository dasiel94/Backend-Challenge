import { FirebaseService } from '../../firebase/services/firebase.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
export declare class TasksService {
    private readonly firebaseService;
    private readonly collectionName;
    constructor(firebaseService: FirebaseService);
    createTask(createTaskDto: CreateTaskDto): Promise<{
        title: string;
        description: string | undefined;
        userEmail: string;
        completed: boolean;
        createdAt: Date;
        taskId: string;
        id: string;
    }>;
    getTasksByUser(userEmail: string): Promise<{
        taskId: any;
        id: string;
    }[]>;
    updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<{
        id: string;
    }>;
    deleteTask(id: string): Promise<{
        message: string;
    }>;
}
