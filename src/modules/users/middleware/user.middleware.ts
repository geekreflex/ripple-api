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

  async validateProfileExists(req: Request, res: Response, next: NextFunction) {
    const user = await UserService.readById(res.locals.jwt.userId);
    if (user) {
      next();
    } else {
      res.status(404).send({ errors: 'User profile not found' });
    }
  }

  async validateUserExists(req: Request, res: Response, next: NextFunction) {
    const user = await UserService.readById(req.params.userId);
    if (user) {
      next();
    } else {
      res.status(404).send({
        errors: [`User ${req.params.userId} not found`],
      });
    }
  }

  async validateSameEmailBelongToSameUser(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const user = await UserService.getUserByEmail(req.body.email);
    if (user && user.id === res.locals.jwt.userId) {
      res.locals.user = user;
      next();
    } else {
      res.status(400).send({ errors: ['Invalid email'] });
    }
  }

  async userCantChangeAdmin(req: Request, res: Response, next: NextFunction) {
    if (req.body.isAdmin) {
      if (res.locals.jwt.isAdmin !== req.body.isAdmin) {
        res.status(400).send({
          errors: ['User cannot change admin role'],
        });
      } else {
        next();
      }
    } else {
      next();
    }
  }
}

export default new UserMiddleware();
