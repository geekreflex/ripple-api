import { Request, Response } from 'express';
import argon2 from 'argon2';
import UserService from '../services/user.service';

class UserController {
  async createUser(req: Request, res: Response) {
    req.body.password = await argon2.hash(req.body.password);
    const user = await UserService.create(req.body);
    res.status(201).send({ user });
  }
}

export default new UserController();
