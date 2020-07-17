import { Request, Response } from "express";
import { UserRepository } from "../repositories/UserRepository";

export class UsersController {
  private userRepo: UserRepository;

  constructor() {
    this.userRepo = new UserRepository();
  }

  public signup = async (req: Request, res: Response) => {
    const [user, error] = await this.userRepo.signup(req.body);

    if (error) {
      // throw the appropriate error message
    }

    return res.status(201).json({
      user,
    });
  };
}
