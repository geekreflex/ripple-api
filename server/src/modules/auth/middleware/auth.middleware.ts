import { Request, Response, NextFunction } from 'express';
import UserService from '../../users/services/user.service';
import * as argon2 from 'argon2';

class AuthMiddleware {
  async verifyUserPassword(req: Request, res: Response, next: NextFunction) {
    const user: any = await UserService.getUserByEmailWithPassword(
      req.body.email
    );

    if (user) {
      const passwordHarsh = user.password;
      if (await argon2.verify(passwordHarsh, req.body.password)) {
        req.body = {
          userId: user._id,
          email: user.email,
          isAdmin: user.isAdmin,
        };
        return next();
      }
    }
    res.status(400).send({ error: 'Invalid email and/or password' });
  }
}

export default new AuthMiddleware();
