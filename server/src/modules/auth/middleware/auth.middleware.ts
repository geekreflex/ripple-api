import { Request, Response, NextFunction } from 'express';
import UserService from '../../users/services/user.service';

class AuthMiddleware {
  async verifyUserPassword(req: Request, res: Response, next: NextFunction) {
    const user: any = await UserService.getUserByEmailWithPassword(
      req.body.password
    );

    if (user) {
      const passwordHarsh = user.password;
    }
  }
}
