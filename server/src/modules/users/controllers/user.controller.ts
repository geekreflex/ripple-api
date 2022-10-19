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
    const user = await UserService.updateById(userId, req.body);
    res.status(200).send({ user });
  }

  async getUserById(req: Request, res: Response) {
    const user = await UserService.readById(req.params.userId);
    res.status(200).send({ user });
  }

  async updateUserById(req: Request, res: Response) {
    const user = await UserService.updateById(req.params.userId, req.body);
    res.status(200).send({ user });
  }

  async followUser(req: Request, res: Response) {
    const { candidateId, action } = req.body;
    const userId = res.locals.jwt.userId;
    const done = await UserService.followUser(userId, candidateId, action);
    res.status(200).send(done);
  }
}

export default new UserController();
