import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import UserService from '../../users/services/user.service';
import { Jwt } from '../../common/types/jwt';

const jwtSecret = process.env.JWT_SECRET;

class JwtMiddleware {
  verifyRefreshBodyField(req: Request, res: Response, next: NextFunction) {
    if (req.body && req.body.refreshToken) {
      return next();
    } else {
      return res
        .status(400)
        .send({ errors: 'Missing required field: refreshToken' });
    }
  }
  async validRefreshNeeded(req: Request, res: Response, next: NextFunction) {
    const user: any = await UserService.getUserByEmailWithPassword(
      res.locals.jwt.email
    );
    const salt = crypto.createSecretKey(
      Buffer.from(res.locals.jwt.refreshKey.data)
    );
    const hash = crypto
      .createHmac('sha512', salt)
      .update(res.locals.jwt.userId + jwtSecret!)
      .digest('base64');
    if (hash === req.body.refreshToken) {
      req.body = {
        userId: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
      };
      return next();
    } else {
      return res.status(400).send({ errors: ['Invalid refresh token'] });
    }
  }

  validateJWTNeeded(req: Request, res: Response, next: NextFunction) {
    if (req.headers['authorization']) {
      try {
        const authorization = req.headers['authorization'].split(' ');
        if (authorization[0] !== 'Bearer') {
          return res.status(401).send();
        } else {
          res.locals.jwt = jwt.verify(authorization[1], jwtSecret!) as Jwt;
          next();
        }
      } catch (error) {
        return res.status(403).send();
      }
    } else {
      return res.status(401).send();
    }
  }
}

export default new JwtMiddleware();
