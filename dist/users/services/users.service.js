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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const firebase_service_1 = require("../../firebase/services/firebase.service");
let UsersService = class UsersService {
    firebaseService;
    collectionName = 'users';
    constructor(firebaseService) {
        this.firebaseService = firebaseService;
    }
    async createUser(createUserDto) {
        const { email, name } = createUserDto;
        const userRef = this.firebaseService.firestore.collection(this.collectionName).doc(email);
        const userDoc = await userRef.get();
        if (userDoc.exists) {
            throw new Error('User already exists');
        }
        await userRef.set({ email, name, createdAt: new Date() });
        return { email, name };
    }
    async findByEmail(email) {
        const userRef = this.firebaseService.firestore.collection(this.collectionName).doc(email);
        const userDoc = await userRef.get();
        if (!userDoc.exists) {
            return null;
        }
        return userDoc.data();
    }
    async validateUserByEmail(email) {
        return this.findByEmail(email);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [firebase_service_1.FirebaseService])
], UsersService);
//# sourceMappingURL=users.service.js.map