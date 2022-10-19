import { object, string, literal, boolean } from 'zod';

export const createCollectionSchema = object({
  body: object({
    name: string({
      required_error: 'Collection name is required',
    }),
    description: string().optional().or(literal('')),
  }),
});

export const UpdateCollectionSchema = object({
  body: object({
    name: string({
      required_error: 'Collection name is required',
    }),
    description: string().optional().or(literal('')),
    private: boolean().optional(),
  }),
});
