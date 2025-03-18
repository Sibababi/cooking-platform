import { object, z, string, type TypeOf } from 'zod';
import { zodObjectId } from '../middlewares/validator';
import { orderColumn, orderDirection, page, pageSize } from './common';

const reviewIdSchema = object({
  id: zodObjectId,
});

export type IReviewIdSchema = TypeOf<typeof reviewIdSchema>;

const reviewAllSchema = object({
  page,
  pageSize,
  orderColumn,
  orderDirection,
  search: string().optional(),
});

export type IReviewAllSchema = TypeOf<typeof reviewAllSchema>;

const reviewCreateSchema = object({
  // <creating-property-create-schema />
  recipeId: zodObjectId,

  cutomerId: zodObjectId,

  comment: z.string(),

  rating: z.number(),
}).strict();

export type IReviewCreateSchema = TypeOf<typeof reviewCreateSchema>;

const reviewUpdateSchema = object({
  // <creating-property-update-schema />
  recipeId: zodObjectId.optional(),

  cutomerId: zodObjectId.optional(),

  comment: z.string().optional(),

  rating: z.number().optional(),
}).strict();

export type IReviewUpdateSchema = TypeOf<typeof reviewUpdateSchema>;

export default {
  reviewId: reviewIdSchema,
  reviewAll: reviewAllSchema,
  reviewCreate: reviewCreateSchema,
  reviewUpdate: reviewUpdateSchema,
};
