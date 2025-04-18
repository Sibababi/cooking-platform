import { type FilterQuery } from 'mongoose';
import { type PaginatedList } from '../../utils/pagination';
import { OrderDirection, type OrderOptions } from '../../utils/order';
import { BaseRepository, type FindOptions } from './base.repository';
import Ingredients, { type IIngredients } from '../models/ingredients.model';

export interface IngredientsFilterOptions {}

export interface IngredientsFindOptions
  extends FindOptions<IngredientsFilterOptions> {
  order: OrderOptions;
}

export class IngredientsRepository extends BaseRepository<IIngredients> {
  constructor() {
    super(Ingredients);
  }

  async findForAdmin(
    options: IngredientsFindOptions,
  ): Promise<PaginatedList<IIngredients>> {
    const { order, pagination, search } = options;

    const query: FilterQuery<IIngredients> = { deletedAt: null };
    if (search) {
      query.$or = [];
    }

    const total = await this.model.where(query).countDocuments();
    const results = await this.model
      .find(query)
      .sort({
        [order.column]: order.direction === OrderDirection.asc ? 1 : -1,
      })
      .limit(pagination.pageSize)
      .skip(pagination.pageSize * (pagination.page - 1));

    return { results, total };
  }
}

export const ingredientsRepository = new IngredientsRepository();
