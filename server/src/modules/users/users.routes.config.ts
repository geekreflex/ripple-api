import { Application } from 'express';
import { CommonRoutesConfig } from '../common/common.routes.config';
import validateResource from '../common/middleware/validate.resource.middle';
import UserController from './controllers/user.controller';
import UserMiddleware from './middleware/user.middleware';
import { createUserSchema } from './schema/user.schema';

export class UsersRoutes extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, 'UserRoutes');
  }

  configureRoutes(): Application {
    this.app
      .route('/api/users')
      .post(
        validateResource(createUserSchema),
        UserMiddleware.validateSameEmailDoesntExit,
        UserController.createUser
      );
    return this.app;
  }
}
