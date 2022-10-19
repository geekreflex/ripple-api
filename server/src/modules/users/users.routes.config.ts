import { Application } from 'express';
import JwtMiddleware from '../auth/middleware/jwt.middleware';
import { CommonRoutesConfig } from '../common/common.routes.config';
import PermissionMiddleware from '../common/middleware/common.permission.middleware';
import validateResource from '../common/middleware/validate.resource.middle';
import UserController from './controllers/user.controller';
import UserMiddleware from './middleware/user.middleware';
import {
  createUserSchema,
  followUserSchema,
  updateUserSchema,
} from './schema/user.schema';

export class UsersRoutes extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, 'UserRoutes');
  }

  configureRoutes(): Application {
    this.app
      .route('/api/users')
      .get(
        JwtMiddleware.validJWTNeeded,
        PermissionMiddleware.onlyAdminCanDoThisAction,
        UserController.listUsers
      )
      .post(
        validateResource(createUserSchema),
        UserMiddleware.validateSameEmailDoesntExit,
        UserController.createUser
      );

    this.app
      .route('/api/users/profile')
      .all(JwtMiddleware.validJWTNeeded, UserMiddleware.validateProfileExists)
      .get(UserController.getAuthUser)
      .put(
        validateResource(updateUserSchema),
        UserMiddleware.userCantChangeAdmin,
        UserController.updateAuthUser
      );

    this.app
      .route('/api/users/follow')
      .all(JwtMiddleware.validJWTNeeded, UserMiddleware.validateProfileExists)
      .post(validateResource(followUserSchema), UserController.followUser);

    this.app
      .route('/api/users/:userId')
      .all(JwtMiddleware.validJWTNeeded, UserMiddleware.validateUserExists)
      .get(UserController.getUserById)
      .put(
        validateResource(updateUserSchema),
        PermissionMiddleware.onlyAdminCanDoThisAction,
        UserController.updateUserById
      );

    return this.app;
  }
}
