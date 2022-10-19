import mongooseService from '../../common/services/mongoose.service';
import logger from '../../../utilities/logger';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

class UserDao {
  users: Array<CreateUserDto> = [];

  Schema = mongooseService.getMongoose().Schema;

  userSchema = new this.Schema(
    {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true },
      password: { type: String, required: true, select: false },
      isAdmin: { type: Boolean, default: false },
      bio: { type: String },
      website: { type: String },
      followers: [{ type: this.Schema.Types.ObjectId, ref: 'User' }],
      following: [{ type: this.Schema.Types.ObjectId, ref: 'User' }],
    },
    { timestamps: true }
  );

  User = mongooseService.getMongoose().model('User', this.userSchema);

  constructor() {
    logger.info('Create new instance of UserDao');
  }

  async addUser(userFields: CreateUserDto) {
    const user = new this.User({
      ...userFields,
      isAmin: false,
    });
    await user.save();
    return user;
  }

  async getUsers(limit = 25, page = 0) {
    return this.User.find()
      .limit(limit)
      .skip(limit * page)
      .exec();
  }

  async getUserById(userId: string) {
    return this.User.findById(userId).exec();
  }

  async getUserByEmail(email: string) {
    return this.User.findOne({ email }).exec();
  }

  async getUserByEmailWithPassword(email: string) {
    return this.User.findOne({ email })
      .select('_id email isAdmin +password')
      .exec();
  }

  async updateUserById(userId: string, userFields: UpdateUserDto) {
    return this.User.findOneAndUpdate(
      { _id: userId },
      { $set: userFields },
      { new: true }
    ).exec();
  }

  async followUser(userId: string, candidateId: string, action: string) {
    console.log(userId, candidateId, action);
    switch (action) {
      case 'follow':
        await Promise.all([
          this.User.findByIdAndUpdate(userId, {
            $addToSet: { following: candidateId },
          }),
          this.User.findByIdAndUpdate(candidateId, {
            $addToSet: { followers: userId },
          }),
        ]);
        break;
      case 'unfollow':
        await Promise.all([
          this.User.findByIdAndUpdate(userId, {
            $pull: { following: candidateId },
          }),
          this.User.findByIdAndUpdate(candidateId, {
            $pull: { followers: userId },
          }),
        ]);
        break;
      default:
        break;
    }
    return { done: true };
  }
}

export default new UserDao();
