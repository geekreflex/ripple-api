import { Request, Response } from 'express';
import UsersServices from '../services/users.service';

class UsersController {
  async createUser(req: Request, res: Response) {
    const user = await UsersServices.create(req.body);
    res.status(201).send({ user });
  }
}

export default new UsersController();
