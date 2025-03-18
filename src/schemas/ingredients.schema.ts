import { object, z, string, type TypeOf } from 'zod';
import { zodObjectId } from '../middlewares/validator';
import { orderColumn, orderDirection, page, pageSize } from './common';

const ingredientsIdSchema = object({
  id: zodObjectId,
});

export type IIngredientsIdSchema = TypeOf<typeof ingredientsIdSchema>;

const ingredientsAllSchema = object({
  page,
  pageSize,
  orderColumn,
  orderDirection,
  search: string().optional(),
});

export type IIngredientsAllSchema = TypeOf<typeof ingredientsAllSchema>;

const ingredientsCreateSchema = object({
  // <creating-property-create-schema />

  name: z.string(),
}).strict();

export type IIngredientsCreateSchema = TypeOf<typeof ingredientsCreateSchema>;

const ingredientsUpdateSchema = object({
  // <creating-property-update-schema />

  name: z.string().optional(),
}).strict();

export type IIngredientsUpdateSchema = TypeOf<typeof ingredientsUpdateSchema>;

export default {
  ingredientsId: ingredientsIdSchema,
  ingredientsAll: ingredientsAllSchema,
  ingredientsCreate: ingredientsCreateSchema,
  ingredientsUpdate: ingredientsUpdateSchema,
};
