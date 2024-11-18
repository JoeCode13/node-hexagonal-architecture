import { Request, Response } from "express";
import { PrismaUserRepository } from "../../persistence/PrismaUserRepository";
import { CreateUserUseCase } from "../../../application/use-cases/CreateUserUseCase";

export class UserController {
  static async createUser(req: Request, res: Response) {
    const { name, email } = req.body;

    const userRepository = new PrismaUserRepository();

    const createUserUseCase = new CreateUserUseCase(userRepository);

    try {
      const user = await createUserUseCase.execute(name, email);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  // Implementar métodos para findById, findAll, update y delete
}
