import { Request, Response, NextFunction } from 'express';
import debug from 'debug';
import UserService from '../services/user.service';

const log: debug.IDebugger = debug('app-users-middleare');

class UserMiddleware {
  async validateSameEmailDoesntExit(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const user = await UserService.getUserByEmail(req.body.email);
    if (user) {
      res.status(400).send({ error: `User email already exists` });
    } else {
      next();
    }
  }

  async validateUserExists(req: Request, res: Response, next: NextFunction) {
    const user: any = UserService.readById(res.locals.jwt.userId);
    if (user) {
      next();
    } else {
      res.status(401).send();
    }
  }
}

export default new UserMiddleware();
