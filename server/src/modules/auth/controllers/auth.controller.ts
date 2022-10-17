import { Request, Response } from 'express';
import debug from 'debug';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const log: debug.IDebugger = debug('app:auth-controller');
const jwtSecret = process.env.JWT_SECRET;
const tokenExpire = process.env.JWT_EXPIRE;

class AuthController {
  async createJwt(req: Request, res: Response) {
    try {
      const refreshId = req.body.userId + jwtSecret!;
      const salt = crypto.createSecretKey(crypto.randomBytes(16));
      const hash = crypto
        .createHmac('sha512', salt)
        .update(refreshId)
        .digest('base64');
      req.body.refreshKey = salt.export();
      const token = jwt.sign(req.body, jwtSecret!, {
        expiresIn: tokenExpire,
      });
      return res.status(201).send({ accessToken: token, refreshToken: hash });
    } catch (error) {
      log('CreateJWT error: %0', error);
      return res.status(500).send();
    }
  }
}

export default new AuthController();
