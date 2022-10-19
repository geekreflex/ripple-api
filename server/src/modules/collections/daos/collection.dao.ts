import mongooseService from '../../common/services/mongoose.service';
import debug from 'debug';
import { CreateCollectionDto } from '../dtos/collection.dto';

const log: debug.IDebugger = debug('app:collection-dao');

class CollectionDao {
  Schema = mongooseService.getMongoose().Schema;

  collectionSchema = new this.Schema(
    {
      name: { type: String, required: true },
      description: { type: String },
      user: { type: this.Schema.Types.ObjectId, ref: 'User' },
    },
    { timestamps: true }
  );

  Collection = mongooseService
    .getMongoose()
    .model('Collection', this.collectionSchema);

  async addCollection(userId: string, fields: CreateCollectionDto) {
    const collection = new this.Collection({
      user: userId,
      ...fields,
    });
    await collection.save();
    return collection;
  }
}

export default new CollectionDao();
