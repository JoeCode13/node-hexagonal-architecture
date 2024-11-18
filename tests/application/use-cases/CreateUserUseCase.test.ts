import { CreateUserUseCase } from "../../../src/application/use-cases/CreateUserUseCase";
import { User } from "../../../src/domain/entities/User";
import { IUserRepository } from "../../../src/domain/repositories/IUserRepository";

class MockUserRepository implements IUserRepository {
  findById(id: number): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
  findAll(): Promise<User[]> {
    throw new Error("Method not implemented.");
  }
  update(user: User): Promise<User> {
    throw new Error("Method not implemented.");
  }
  delete(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  private users: User[] = [];

  async save(user: User): Promise<User> {
    const newUser = new User(
      this.users.length + 1,
      user.name,
      user.email,
      new Date()
    );
    this.users.push(newUser);
    return newUser;
  }

  // Implementar los demás métodos si es necesario
}

describe("CreateUserUseCase", () => {
  test("debe crear un nuevo usuario", async () => {
    const userRepository = new MockUserRepository();
    const createUserUseCase = new CreateUserUseCase(userRepository);

    const user = await createUserUseCase.execute(
      "Test User",
      "test@example.com"
    );

    expect(user.id).toBe(1);
    expect(user.name).toBe("Test User");
    expect(user.email).toBe("test@example.com");
  });
});
