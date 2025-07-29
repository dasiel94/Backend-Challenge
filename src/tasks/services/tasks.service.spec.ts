import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { FirebaseService } from '../../firebase/services/firebase.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { NotFoundException } from '@nestjs/common';

describe('TasksService', () => {
  let service: TasksService;
  let firebaseService: Partial<FirebaseService>;
  let firestoreMock: any;

  beforeEach(async () => {
    firestoreMock = {
      collection: jest.fn().mockReturnThis(),
      doc: jest.fn().mockReturnThis(),
      set: jest.fn(),
      get: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      where: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      id: 'mockedTaskId',
    };
    firebaseService = { firestore: firestoreMock } as any;
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: FirebaseService, useValue: firebaseService },
      ],
    }).compile();
    service = module.get<TasksService>(TasksService);
  });

  it('should create a task and store taskId', async () => {
    firestoreMock.set.mockResolvedValueOnce(undefined);
    firestoreMock.id = 'mockedTaskId';
    const dto: CreateTaskDto = { title: 'Task', userEmail: 'user@mail.com' };
    const result = await service.createTask(dto);
    expect(result).toHaveProperty('id', 'mockedTaskId');
    expect(result).toHaveProperty('taskId', 'mockedTaskId');
    expect(result).toHaveProperty('title', 'Task');
    expect(result).toHaveProperty('userEmail', 'user@mail.com');
    expect(firestoreMock.set).toHaveBeenCalledWith(expect.objectContaining({ taskId: 'mockedTaskId' }));
  });

  it('should get tasks by user and return taskId', async () => {
    firestoreMock.get.mockResolvedValueOnce({ docs: [
      { id: '1', data: () => ({ title: 'Task1', userEmail: 'user@mail.com', taskId: '1' }) },
      { id: '2', data: () => ({ title: 'Task2', userEmail: 'user@mail.com', taskId: '2' }) },
    ] });
    const result = await service.getTasksByUser('user@mail.com');
    expect(result.length).toBe(2);
    expect(result[0]).toHaveProperty('id', '1');
    expect(result[0]).toHaveProperty('taskId', '1');
    expect(result[1]).toHaveProperty('taskId', '2');
  });

  it('should update a task', async () => {
    firestoreMock.get.mockResolvedValueOnce({ exists: true });
    firestoreMock.update.mockResolvedValueOnce(undefined);
    firestoreMock.get.mockResolvedValueOnce({ id: '1', data: () => ({ title: 'Updated' }) });
    const dto: UpdateTaskDto = { title: 'Updated' };
    const result = await service.updateTask('1', dto);
    expect(result).toHaveProperty('id', '1');
    expect(result).toHaveProperty('title', 'Updated');
  });

  it('should throw if updating non-existent task', async () => {
    firestoreMock.get.mockResolvedValueOnce({ exists: false });
    const dto: UpdateTaskDto = { title: 'Updated' };
    await expect(service.updateTask('1', dto)).rejects.toThrow(NotFoundException);
  });

  it('should delete a task', async () => {
    firestoreMock.get.mockResolvedValueOnce({ exists: true });
    firestoreMock.delete.mockResolvedValueOnce(undefined);
    const result = await service.deleteTask('1');
    expect(result).toEqual({ message: 'Task deleted successfully' });
  });

  it('should throw if deleting non-existent task', async () => {
    firestoreMock.get.mockResolvedValueOnce({ exists: false });
    await expect(service.deleteTask('1')).rejects.toThrow(NotFoundException);
  });
}); 