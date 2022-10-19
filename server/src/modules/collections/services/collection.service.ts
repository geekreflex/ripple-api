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
}

export default new CollectionService();
