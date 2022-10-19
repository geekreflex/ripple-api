import { CommonRoutesConfig } from '../common/common.routes.config';
import CollectionController from './controllers/collection.controller';
import JwtMiddleware from '../auth/middleware/jwt.middleware';
import CollectionMiddleware from './middleware/collection.middleware';
import PermissionMiddleware from '../common/middleware/common.permission.middleware';
import UserMiddleware from '../users/middleware/user.middleware';

import { Application } from 'express';
import validateResource from '../common/middleware/validate.resource.middle';
import {
  createCollectionSchema,
  UpdateCollectionSchema,
} from './schema/collection.schema';

export class CollectionsRoutes extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, 'CollectionsRoutes');
  }

  configureRoutes(): Application {
    this.app
      .route('/api/collections')
      .all(JwtMiddleware.validJWTNeeded)
      .get(
        PermissionMiddleware.onlyAdminCanDoThisAction,
        CollectionController.getCollections
      )
      .post(
        validateResource(createCollectionSchema),
        CollectionController.createCollection
      );

    this.app
      .route('/api/collections/:collectionId')
      .all(
        JwtMiddleware.validJWTNeeded,
        CollectionMiddleware.validateCollectionExists
      )
      .get(
        CollectionMiddleware.validateCollectionPrivacy,
        CollectionController.getCollectionById
      )
      .put(
        validateResource(UpdateCollectionSchema),
        CollectionMiddleware.validateCollectionBelongToSameUser,
        CollectionController.updateCollection
      )
      .delete(
        CollectionMiddleware.validateCollectionBelongToSameUser,
        CollectionController.deleteCollection
      );

    this.app
      .route('/api/collections/user/:userId')
      .get(
        UserMiddleware.validateUserExists,
        CollectionController.getUserPublicCollections
      );

    this.app
      .route('/api/collections/authUser')
      .get(
        JwtMiddleware.validJWTNeeded,
        UserMiddleware.validateProfileExists,
        CollectionController.getAuthUserCollections
      );

    return this.app;
  }
}
