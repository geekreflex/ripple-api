export interface CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  bio?: string;
  website?: string;
  isAdmin?: string;
}
