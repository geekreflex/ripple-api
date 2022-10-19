import { CommonRoutesConfig } from '../common/common.routes.config';
import CollectionController from './controllers/collection.controller';
import JwtMiddleware from '../auth/middleware/jwt.middleware';
import CollectionMiddleware from './middleware/collection.middleware';

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
      .post(
        JwtMiddleware.validJWTNeeded,
        validateResource(createCollectionSchema),
        CollectionController.createCollection
      );

    this.app
      .route('/api/collections/:collectionId')
      .all(JwtMiddleware.validJWTNeeded)
      .get(
        CollectionMiddleware.onlyCollectionOwnerOrAdminCanDoThisAction,
        CollectionController.getCollectionById
      )
      .put(
        validateResource(UpdateCollectionSchema),
        CollectionMiddleware.validateCollectionBelongToSameUser,
        CollectionController.updateCollection
      );

    return this.app;
  }
}
