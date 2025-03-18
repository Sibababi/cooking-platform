import { object, z, string, type TypeOf } from 'zod';
import { zodObjectId } from '../middlewares/validator';
import { orderColumn, orderDirection, page, pageSize } from './common';

const ingredientsCreateSchema = object({
  // <creating-property-create-schema-ingredients />
  ingredientIdIds: zodObjectId.array(),
});
export type IIngredientsCreateSchema = TypeOf<typeof ingredientsCreateSchema>;

const ingredientsUpdateSchema = object({
  // <creating-property-update-schema-ingredients />
  ingredientIdIds: zodObjectId.array().optional(),
});
export type IIngredientsUpdateSchema = TypeOf<typeof ingredientsUpdateSchema>;

const recipesIdSchema = object({
  id: zodObjectId,
});

export type IRecipesIdSchema = TypeOf<typeof recipesIdSchema>;

const recipesAllSchema = object({
  page,
  pageSize,
  orderColumn,
  orderDirection,
  search: string().optional(),
});

export type IRecipesAllSchema = TypeOf<typeof recipesAllSchema>;

const recipesCreateSchema = object({
  // <creating-property-create-schema />
  categId: zodObjectId,

  ingredients: z.array(ingredientsCreateSchema),

  title: z.array(z.string()).optional().nullable(),
}).strict();

export type IRecipesCreateSchema = TypeOf<typeof recipesCreateSchema>;

const recipesUpdateSchema = object({
  // <creating-property-update-schema />
  categId: zodObjectId.optional(),

  ingredients: z.array(ingredientsUpdateSchema),

  title: z.array(z.string()).optional().optional().nullable(),
}).strict();

export type IRecipesUpdateSchema = TypeOf<typeof recipesUpdateSchema>;

export default {
  recipesId: recipesIdSchema,
  recipesAll: recipesAllSchema,
  recipesCreate: recipesCreateSchema,
  recipesUpdate: recipesUpdateSchema,
};
