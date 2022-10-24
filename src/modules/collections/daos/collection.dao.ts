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
      photos: [{ type: this.Schema.Types.ObjectId, ref: 'Photo' }],
      slug: { type: String, required: true },
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

  async deleteCollectionBy(collectionId: string) {
    return this.Collection.deleteOne({ _id: collectionId }).exec();
  }

  async getUserPublicCollectionsById(userId: string) {
    return this.Collection.find({ user: userId, private: false }).exec();
  }

  async getAuthUserCollectionsById(userId: string) {
    return this.Collection.find({ user: userId }).exec();
  }

  async getCollections(limit = 100, page = 0) {
    return this.Collection.find()
      .limit(limit)
      .skip(limit * page)
      .exec();
  }
}

export default new CollectionDao();
