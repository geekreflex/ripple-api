import { object, string, TypeOf } from 'zod';

export const registerUserSchema = object({
  body: object({
    firstName: string({
      required_error: 'First name is required',
    }),
    lastName: string({
      required_error: 'Last name is required',
    }),
    password: string({
      required_error: 'Password is required',
    }).min(6, 'Password must be atleast 6 chars'),
    email: string({
      required_error: 'Email is required',
    }).email('Not a valid email'),
  }),
});

export type RegisterUserInput = TypeOf<typeof registerUserSchema>;
