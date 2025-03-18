import { type FilterQuery } from 'mongoose';
import { type PaginatedList } from '../../utils/pagination';
import { OrderDirection, type OrderOptions } from '../../utils/order';
import { BaseRepository, type FindOptions } from './base.repository';
import Recipes, { type IRecipes } from '../models/recipes.model';

export interface RecipesFilterOptions {}

export interface RecipesFindOptions extends FindOptions<RecipesFilterOptions> {
  order: OrderOptions;
}

export class RecipesRepository extends BaseRepository<IRecipes> {
  constructor() {
    super(Recipes);
  }

  async findForAdmin(
    options: RecipesFindOptions,
  ): Promise<PaginatedList<IRecipes>> {
    const { order, pagination, search } = options;

    const query: FilterQuery<IRecipes> = { deletedAt: null };
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
      .skip(pagination.page * pagination.pageSize);

    return { results, total };
  }
}

export const recipesRepository = new RecipesRepository();
