import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { User } from "../../domain/entities/User";
import { PrismaClient } from "@prisma/client";

export class PrismaUserRepository implements IUserRepository {
  private prisma = new PrismaClient();

  async save(user: User): Promise<User> {
    const createdUser = await this.prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
      },
    });
    return new User(
      createdUser.id,
      createdUser.name,
      createdUser.email,
      createdUser.createdAt
    );
  }

  async findById(id: number): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) return null;
    return new User(user.id, user.name, user.email, user.createdAt);
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users.map(
      (user) => new User(user.id, user.name, user.email, user.createdAt)
    );
  }

  async update(user: User): Promise<User> {
    const updatedUser = await this.prisma.user.update({
      where: { id: user.id! },
      data: {
        name: user.name,
        email: user.email,
      },
    });
    return new User(
      updatedUser.id,
      updatedUser.name,
      updatedUser.email,
      updatedUser.createdAt
    );
  }

  async delete(id: number): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}
