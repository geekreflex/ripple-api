import { CRUD } from '../../common/interfaces/crud.interface';
import UsersDao from '../daos/users.dao';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { omit } from 'lodash';

class UserService implements CRUD {
  async create(resource: CreateUserDto) {
    const user = UsersDao.addUser(resource);
    return omit((await user).toJSON(), 'password');
  }

  async list(limit: number, page: number) {
    return UsersDao.getUsers(limit, page);
  }

  async readById(id: string) {
    return UsersDao.getUserById(id);
  }

  async updateById(id: string, resource: UpdateUserDto): Promise<any> {
    return UsersDao.updateUserById(id, resource);
  }

  async getUserByEmail(email: string) {
    return UsersDao.getUserByEmail(email);
  }

  async getUserByEmailWithPassword(email: string) {
    return UsersDao.getUserByEmailWithPassword(email);
  }
}

export default new UserService();
