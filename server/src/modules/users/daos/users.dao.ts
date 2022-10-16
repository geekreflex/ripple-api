import mongooseService from '../../common/services/mongoose.service';
import logger from '../../../utilities/logger';
import { CreateUserDto } from '../dtos/create.user.dto';

class UsersDao {
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
    console.log(user);
  }
}
