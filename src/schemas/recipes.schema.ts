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

const ingCreateSchema = object({
  // <creating-property-create-schema-ing />
  ingrId: zodObjectId,

  count: z.number(),
});
export type IIngCreateSchema = TypeOf<typeof ingCreateSchema>;

const ingUpdateSchema = object({
  // <creating-property-update-schema-ing />
  ingrId: zodObjectId.optional(),

  count: z.number(),
});
export type IIngUpdateSchema = TypeOf<typeof ingUpdateSchema>;

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
  ing: z.array(ingCreateSchema),

  description: z.string(),

  instructions: z.string(),

  preparationTime: z.string(),

  cookingTime: z.string(),

  srevings: z.string(),

  categId: zodObjectId,


  title: z.string(),
}).strict();

export type IRecipesCreateSchema = TypeOf<typeof recipesCreateSchema>;

const recipesUpdateSchema = object({
  // <creating-property-update-schema />
  ing: z.array(ingUpdateSchema),

  description: z.string().optional(),

  instructions: z.string().optional(),

  preparationTime: z.string().optional(),

  cookingTime: z.string().optional(),

  srevings: z.string().optional(),

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
