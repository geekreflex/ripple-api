import { CRUD } from '../../common/interfaces/crud.interface';
import UsersDao from '../daos/users.dao';
import { CreateUserDto } from '../dtos/create.user.dto';
import { UpdateUserDto } from '../dtos/update.user.dto';
import { omit } from 'lodash';

class UserService implements CRUD {
  async create(resource: CreateUserDto) {
    const user = UsersDao.addUser(resource);
    return omit((await user).toJSON(), 'password');
  }

  async readById(id: string) {
    return UsersDao.getUserById(id);
  }

  async getUserByEmail(email: string) {
    return UsersDao.getUserByEmail(email);
  }

  async getUserByEmailWithPassword(email: string) {
    return UsersDao.getUserByEmailWithPassword(email);
  }
}

export default new UserService();
