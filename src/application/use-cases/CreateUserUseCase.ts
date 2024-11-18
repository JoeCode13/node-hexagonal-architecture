import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { User } from '../../domain/entities/User';

export class CreateUserUseCase {
    constructor(private userRepository: IUserRepository) {}

    async execute(name: string, email: string): Promise<User> {
        const user = new User(null, name, email, new Date());
        return await this.userRepository.save(user);
    }
}
