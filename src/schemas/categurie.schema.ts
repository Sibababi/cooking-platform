import { object, z, string, type TypeOf } from 'zod';
import { zodObjectId } from '../middlewares/validator';
import { orderColumn, orderDirection, page, pageSize } from './common';

const categurieIdSchema = object({
  id: zodObjectId,
});

export type ICategurieIdSchema = TypeOf<typeof categurieIdSchema>;

const categurieAllSchema = object({
  page,
  pageSize,
  orderColumn,
  orderDirection,
  search: string().optional(),
});

export type ICategurieAllSchema = TypeOf<typeof categurieAllSchema>;

const categurieCreateSchema = object({
  // <creating-property-create-schema />

  name: z.string(),
}).strict();

export type ICategurieCreateSchema = TypeOf<typeof categurieCreateSchema>;

const categurieUpdateSchema = object({
  // <creating-property-update-schema />

  name: z.string().optional(),
}).strict();

export type ICategurieUpdateSchema = TypeOf<typeof categurieUpdateSchema>;

export default {
  categurieId: categurieIdSchema,
  categurieAll: categurieAllSchema,
  categurieCreate: categurieCreateSchema,
  categurieUpdate: categurieUpdateSchema,
};
