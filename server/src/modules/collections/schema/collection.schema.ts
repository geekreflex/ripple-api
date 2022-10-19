import { object, string, literal } from 'zod';

export const createCollectionSchema = object({
  body: object({
    name: string({
      required_error: 'Collection name is required',
    }),
    description: string().optional().or(literal('')),
  }),
});
