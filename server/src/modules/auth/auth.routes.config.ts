import { CommonRoutesConfig } from '../common/common.routes.config';
import AuthController from './controllers/auth.controller';
import { Application } from 'express';
import validateResource from '../common/middleware/validate.resource.middle';
import { authSchema } from './schema/auth.schema';

export class AuthRoutes extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, 'AuthRoutes');
  }

  configureRoutes(): Application {
    this.app.post(
      '/api/auth',
      validateResource(authSchema),
      AuthController.createJwt
    );

    return this.app;
  }
}
