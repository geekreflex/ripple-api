import { CRUD } from '../../common/interfaces/crud.interface';
import UsersDao from '../daos/users.dao';
import { CreateUserDto } from '../dtos/create.user.dto';
import { UpdateUserDto } from '../dtos/update.user.dto';

class UsersServices implements CRUD {
  async create(resource: CreateUserDto) {
    return UsersDao.addUser(resource);
  }

  async readById(id: string) {
    return UsersDao.getUserById(id);
  }

  async getUserByEmail(email: string) {
    return UsersDao.getUserByEmail(email);
  }
}

export default new UsersServices();
