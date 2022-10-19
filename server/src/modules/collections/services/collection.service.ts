import CollectionDao from '../daos/collection.dao';
import { CreateCollectionDto } from '../dtos/collection.dto';

class CollectionService {
  async create(id: string, resource: CreateCollectionDto) {
    return CollectionDao.addCollection(id, resource);
  }
}

export default new CollectionService();
