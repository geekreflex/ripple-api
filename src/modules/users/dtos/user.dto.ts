export interface CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface UpdateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  bio?: string;
  website?: string;
  social?: string;
  avatar?: string;
}
