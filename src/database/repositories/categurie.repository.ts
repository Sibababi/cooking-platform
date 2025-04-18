import { type FilterQuery } from 'mongoose';
import { type PaginatedList } from '../../utils/pagination';
import { OrderDirection, type OrderOptions } from '../../utils/order';
import { BaseRepository, type FindOptions } from './base.repository';
import Categurie, { type ICategurie } from '../models/categurie.model';

export interface CategurieFilterOptions {}

export interface CategurieFindOptions
  extends FindOptions<CategurieFilterOptions> {
  order: OrderOptions;
}

export class CategurieRepository extends BaseRepository<ICategurie> {
  constructor() {
    super(Categurie);
  }

  async findForAdmin(
    options: CategurieFindOptions,
  ): Promise<PaginatedList<ICategurie>> {
    const { order, pagination, search } = options;

    const query: FilterQuery<ICategurie> = { deletedAt: null };
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

export const categurieRepository = new CategurieRepository();
