import mongooseService from '../../common/services/mongoose.service';
import debug from 'debug';

const log: debug.IDebugger = debug('app:upload-dao');

class UploadDao {
  Schema = mongooseService.getMongoose().Schema;

  uploadSchema = new this.Schema({
    title: { type: String, required: true },
    tags: [{ type: String }],
    user: { type: this.Schema.Types.ObjectId, ref: 'User' },
    views: { type: Number, default: 0 },
    downloads: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    size: { type: String },
    dimensions: { type: String },
    camera: { type: String },
  });

  Upload = mongooseService.getMongoose().model('Upload', this.uploadSchema);

  constructor() {
    log('Created new instance of UploadDao');
  }
}

export default new UploadDao();
