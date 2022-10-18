import { Request, Response } from 'express';
import argon2 from 'argon2';
import UserService from '../services/user.service';
import debug from 'debug';

const log: debug.IDebugger = debug('app:users-controller');

class UserController {
  async createUser(req: Request, res: Response) {
    req.body.password = await argon2.hash(req.body.password);
    const user = await UserService.create(req.body);
    res.status(201).send({ user });
  }

  async listUsers(req: Request, res: Response) {
    const users = await UserService.list(100, 0);
    res.status(200).send(users);
  }

  async getAuthUser(req: Request, res: Response) {
    const userId = res.locals.jwt.userId;
    const user = await UserService.readById(userId);
    res.status(200).send({ user });
  }

  async updateAuthUser(req: Request, res: Response) {
    const userId = res.locals.jwt.userId;
    log(await UserService.updateById(userId, req.body));
    return res.status(204).send();
  }
}

export default new UserController();
