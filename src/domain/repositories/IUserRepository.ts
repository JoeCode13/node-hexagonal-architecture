import { User } from '../entities/User';

export interface IUserRepository {
    save(user: User): Promise<User>;
    findById(id: number): Promise<User | null>;
    findAll(): Promise<User[]>;
    update(user: User): Promise<User>;
    delete(id: number): Promise<void>;
}
