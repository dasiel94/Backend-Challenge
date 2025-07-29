"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const firebase_service_1 = require("../../firebase/services/firebase.service");
let TasksService = class TasksService {
    firebaseService;
    collectionName = 'tasks';
    constructor(firebaseService) {
        this.firebaseService = firebaseService;
    }
    async createTask(createTaskDto) {
        const { title, description, userEmail, completed = false } = createTaskDto;
        const createdAt = new Date();
        const taskRef = this.firebaseService.firestore.collection(this.collectionName).doc();
        const taskId = taskRef.id;
        const task = { title, description, userEmail, completed, createdAt, taskId };
        await taskRef.set(task);
        return { id: taskId, ...task };
    }
    async getTasksByUser(userEmail) {
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
    async updateTask(id, updateTaskDto) {
        const taskRef = this.firebaseService.firestore.collection(this.collectionName).doc(id);
        const taskDoc = await taskRef.get();
        if (!taskDoc.exists) {
            throw new common_1.NotFoundException('Task not found');
        }
        await taskRef.update({ ...updateTaskDto });
        const updatedDoc = await taskRef.get();
        return { id: updatedDoc.id, ...updatedDoc.data() };
    }
    async deleteTask(id) {
        const taskRef = this.firebaseService.firestore.collection(this.collectionName).doc(id);
        const taskDoc = await taskRef.get();
        if (!taskDoc.exists) {
            throw new common_1.NotFoundException('Task not found');
        }
        await taskRef.delete();
        return { message: 'Task deleted successfully' };
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [firebase_service_1.FirebaseService])
], TasksService);
//# sourceMappingURL=tasks.service.js.map