import CollectionDao from '../daos/collection.dao';
import {
  CreateCollectionDto,
  UpdateCollectionDto,
} from '../dtos/collection.dto';

class CollectionService {
  async create(userId: string, resource: CreateCollectionDto) {
    return CollectionDao.addCollection(userId, resource);
  }

  async update(collectionId: string, resource: UpdateCollectionDto) {
    return CollectionDao.updateCollectionById(collectionId, resource);
  }

  async readById(collectionId: string) {
    return CollectionDao.getCollectionById(collectionId);
  }

  async deleteById(collectionId: string) {
    return CollectionDao.deleteCollectionBy(collectionId);
  }

  async getUserPublicCollections(userId: string) {
    return CollectionDao.getUserPublicCollectionsById(userId);
  }

  async getAuthUserCollections(userId: string) {
    return CollectionDao.getAuthUserCollectionsById(userId);
  }

  async listCollections(limit: number, page: number) {
    return CollectionDao.getCollections(limit, page);
  }
}

export default new CollectionService();
