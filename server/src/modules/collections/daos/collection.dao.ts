import mongooseService from '../../common/services/mongoose.service';
import debug from 'debug';
import {
  CreateCollectionDto,
  UpdateCollectionDto,
} from '../dtos/collection.dto';

const log: debug.IDebugger = debug('app:collection-dao');

class CollectionDao {
  Schema = mongooseService.getMongoose().Schema;

  collectionSchema = new this.Schema(
    {
      name: { type: String, required: true },
      description: { type: String },
      user: { type: this.Schema.Types.ObjectId, ref: 'User' },
      private: { type: Boolean, default: false },
    },
    { timestamps: true }
  );

  Collection = mongooseService
    .getMongoose()
    .model('Collection', this.collectionSchema);

  constructor() {
    log('Created new instance for CollectionDao');
  }

  async addCollection(userId: string, fields: CreateCollectionDto) {
    const collection = new this.Collection({
      user: userId,
      ...fields,
    });
    await collection.save();
    return collection;
  }

  async updateCollectionById(
    collectionId: string,
    fields: UpdateCollectionDto
  ) {
    const existingCollection = await this.Collection.findOneAndUpdate(
      { _id: collectionId },
      { $set: fields },
      { new: true }
    ).exec();

    return existingCollection;
  }

  async getCollectionById(collectionId: string) {
    return this.Collection.findOne({ _id: collectionId })
      .populate('user')
      .exec();
  }
}

export default new CollectionDao();
