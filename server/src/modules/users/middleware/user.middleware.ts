import { Request, Response, NextFunction } from 'express';
import UsersService from '../services/users.service';
import debug from 'debug';

const log: debug.IDebugger = debug('app-users-middleare');

class UsersMiddleware {
  async validateSameEmailDoesntExit(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const user = await UsersService.getUserByEmail(req.body.email);
    if (user) {
      res.status(400).send({ error: `User email already exists` });
    } else {
      next();
    }
  }
}

export default new UsersMiddleware();
