import { CRUD } from '../../common/interfaces/crud.interface';
import usersDao from '../daos/users.dao';
import { CreateUserDto } from '../dtos/create.user.dto';
import { UpdateUserDto } from '../dtos/update.user.dto';

class UsersServices implements CRUD {
  async create(resource: CreateUserDto) {
    return usersDao.addUser(resource);
  }
}

export default new UsersServices();
