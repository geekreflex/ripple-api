import { Request, Response, NextFunction } from 'express';
import debug from 'debug';

const log: debug.IDebugger = debug('app:common-permission-middleware');

class CommonPermissionMiddleware {
  async onlyAdminCanDoThisAction(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const isAdmin = res.locals.jwt.isAdmin;
    if (isAdmin) {
      return next();
    } else {
      return res.status(403).send();
    }
  }
}

export default new CommonPermissionMiddleware();
