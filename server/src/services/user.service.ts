import { DocumentDefinition } from 'mongoose';
import User, { UserDocument } from '../models/user.model';

export async function createUser(input: DocumentDefinition<UserDocument>) {
  try {
    const user = await User.create(input);
    return user;
  } catch (error: any) {
    throw new Error(error);
  }
}
