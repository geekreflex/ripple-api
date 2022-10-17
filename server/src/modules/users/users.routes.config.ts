import { Application } from 'express';
import { CommonRoutesConfig } from '../common/common.routes.config';
import validateResource from '../common/middleware/validate.resource.middle';
import UsersController from './controllers/user.controller';
import { createUserSchema } from './schema/user.schema';

export class UsersRoutes extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, 'UserRoutes');
  }

  configureRoutes(): Application {
    this.app
      .route('/api/users')
      .post(validateResource(createUserSchema), UsersController.createUser);
    return this.app;
  }
}
