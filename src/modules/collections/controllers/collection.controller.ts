import { Request, Response } from 'express';
import CollectionService from '../services/collection.service';
import debug from 'debug';

const log: debug.IDebugger = debug('app:collections-controller');

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

  async deleteCollection(req: Request, res: Response) {
    const collectionId = req.params.collectionId;
    log(await CollectionService.deleteById(collectionId));
    res.status(204).send({ message: 'collection deleted' });
  }

  async getUserPublicCollections(req: Request, res: Response) {
    const userId = req.params.userId;
    const collections = await CollectionService.getUserPublicCollections(
      userId
    );
    res
      .status(200)
      .send({ message: 'user public collections', data: collections });
  }

  async getAuthUserCollections(req: Request, res: Response) {
    const userId = res.locals.jwt.userId;
    const collections = await CollectionService.getAuthUserCollections(userId);
    res
      .status(200)
      .send({ message: 'auth user collections', data: collections });
  }

  async getCollections(req: Request, res: Response) {
    const collections = await CollectionService.listCollections(100, 0);
    res.status(200).send({ message: 'collections', data: collections });
  }
}

export default new CollectionController();
