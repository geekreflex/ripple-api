import { Application } from 'express';
import JwtMiddleware from '../auth/middleware/jwt.middleware';
import { CommonRoutesConfig } from '../common/common.routes.config';
import validateResource from '../common/middleware/validate.resource.middle';
import UserController from './controllers/user.controller';
import UserMiddleware from './middleware/user.middleware';
import { createUserSchema, updateUserSchema } from './schema/user.schema';

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

    this.app
      .route('/api/users/profile')
      .all(JwtMiddleware.validJWTNeeded, UserMiddleware.validateUserExists)
      .get(UserController.getAuthUser)
      .put(validateResource(updateUserSchema), UserController.updateAuthUser);
    return this.app;
  }
}
