import { Injectable, NotFoundException } from '@nestjs/common';
import { FirebaseService } from '../../firebase/services/firebase.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';

@Injectable()
export class TasksService {
  private readonly collectionName = 'tasks';

  constructor(private readonly firebaseService: FirebaseService) {
  }

  async createTask(createTaskDto: CreateTaskDto) {
    const { title, description, userEmail, completed = false } = createTaskDto;
    const createdAt = new Date();
    const taskRef = this.firebaseService.firestore.collection(this.collectionName).doc();
    const taskId = taskRef.id;
    const task = { title, description, userEmail, completed, createdAt, taskId };
    await taskRef.set(task);
    return { id: taskId, ...task };
  }

  async getTasksByUser(userEmail: string) {
    const snapshot = await this.firebaseService.firestore
      .collection(this.collectionName)
      .where('userEmail', '==', userEmail)
      .orderBy('createdAt', 'asc')
      .get();
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return { id: doc.id, ...data, taskId: data.taskId || doc.id };
    });
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto) {
    const taskRef = this.firebaseService.firestore.collection(this.collectionName).doc(id);
    const taskDoc = await taskRef.get();
    if (!taskDoc.exists) {
      throw new NotFoundException('Task not found');
    }
    await taskRef.update({ ...updateTaskDto });
    const updatedDoc = await taskRef.get();
    return { id: updatedDoc.id, ...updatedDoc.data() };
  }

  async deleteTask(id: string) {
    const taskRef = this.firebaseService.firestore.collection(this.collectionName).doc(id);
    const taskDoc = await taskRef.get();
    if (!taskDoc.exists) {
      throw new NotFoundException('Task not found');
    }
    await taskRef.delete();
    return { message: 'Task deleted successfully' };
  }
} 