import { CommonRoutesConfig } from '../common/common.routes.config';
import AuthController from './controllers/auth.controller';
import { Application } from 'express';
import validateResource from '../common/middleware/validate.resource.middle';
import { authSchema } from './schema/auth.schema';
import AuthMiddleware from './middleware/auth.middleware';
import JwtMiddleware from './middleware/jwt.middleware';

export class AuthRoutes extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, 'AuthRoutes');
  }

  configureRoutes(): Application {
    this.app.post(
      '/api/auth/login',
      validateResource(authSchema),
      AuthMiddleware.verifyUserPassword,
      AuthController.createJWT
    );

    this.app.post(
      '/api/auth/refresh-token',
      JwtMiddleware.validJWTNeeded,
      JwtMiddleware.verifyRefreshBodyField,
      JwtMiddleware.validRefreshNeeded,
      AuthController.createJWT
    );

    return this.app;
  }
}
