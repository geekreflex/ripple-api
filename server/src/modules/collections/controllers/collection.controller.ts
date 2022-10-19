import { Request, Response } from 'express';
import CollectionService from '../services/collection.service';

class CollectionController {
  async createCollection(req: Request, res: Response) {
    const userId = res.locals.jwt.userId;
    const collection = await CollectionService.create(userId, req.body);
    res.status(201).send({ collection });
  }

  async updateCollection(req: Request, res: Response) {
    const collectionId = req.params.collectionId;
    const collection = await CollectionService.update(collectionId, req.body);
    res.status(200).send({ message: 'updated', data: collection });
  }

  async getCollectionById(req: Request, res: Response) {
    const collectionId = req.params.collectionId;
    const collection = await CollectionService.readById(collectionId);
    res.status(200).send({ message: 'fetched collection', data: collection });
  }
}

export default new CollectionController();
