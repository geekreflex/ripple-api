import { Request, Response, NextFunction } from 'express';
import CollectionService from '../services/collection.service';

class CollectionController {
  async createCollection(req: Request, res: Response, next: NextFunction) {
    const userId = res.locals.jwt.userId;
    const collection = await CollectionService.create(userId, req.body);
    res.status(201).send({ collection });
  }
}

export default new CollectionController();
