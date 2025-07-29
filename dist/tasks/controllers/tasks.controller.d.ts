import { TasksService } from '../services/tasks.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    getTasks(userEmail: string): Promise<{
        taskId: any;
        id: string;
    }[]>;
    createTask(createTaskDto: CreateTaskDto): Promise<{
        title: string;
        description: string | undefined;
        userEmail: string;
        completed: boolean;
        createdAt: Date;
        taskId: string;
        id: string;
    }>;
    updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<{
        id: string;
    }>;
    deleteTask(id: string): Promise<{
        message: string;
    }>;
}
