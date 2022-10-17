import { CommonRoutesConfig } from '../common/common.routes.config';
import AuthController from './controllers/auth.controller';
import { Application } from 'express';
import validateResource from '../common/middleware/validate.resource.middle';
import { authSchema } from './schema/auth.schema';
import AuthMiddleware from './middleware/auth.middleware';

export class AuthRoutes extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, 'AuthRoutes');
  }

  configureRoutes(): Application {
    this.app.post(
      '/api/auth',
      validateResource(authSchema),
      AuthMiddleware.verifyUserPassword,
      AuthController.createJWT
    );

    return this.app;
  }
}
