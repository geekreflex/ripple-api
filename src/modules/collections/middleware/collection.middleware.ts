import { Request, Response, NextFunction } from 'express';
import CollectionService from '../services/collection.service';

class CollectionMiddleware {
  async validateCollectionBelongToSameUser(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const userId = res.locals.jwt.userId;
    const collection = await CollectionService.readById(
      req.params.collectionId
    );
    if (collection && collection.user?.id !== userId) {
      res.status(403).send();
    } else {
      next();
    }
  }

  async validateCollectionExists(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const collection = await CollectionService.readById(
      req.params.collectionId
    );
    if (collection) {
      next();
    } else {
      res.status(404).send({
        errors: [`Collection ${req.params.collectionId} not found`],
      });
    }
  }

  async validateCollectionPrivacy(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { userId, isAdmin } = res.locals.jwt;
    const collection = await CollectionService.readById(
      req.params.collectionId
    );

    if (collection && collection.private) {
      if (!isAdmin || collection.user?.id !== userId) {
        return res.status(403).send();
      } else {
        return next();
      }
    } else {
      next();
    }
  }
}

export default new CollectionMiddleware();
