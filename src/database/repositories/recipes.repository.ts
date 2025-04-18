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
      query.$or = [
        
          {  description: { $regex: new RegExp(search, 'i') } },
          {  cookingTime: { $regex: new RegExp(search, 'i') } },
        
      ];
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

  async findById(id: string): Promise<IRecipes | null> {
    return await this.model.findById(id);
  }
}

export const recipesRepository = new RecipesRepository();
