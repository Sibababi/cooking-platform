import { type FilterQuery } from 'mongoose';
import { type PaginatedList } from '../../utils/pagination';
import { OrderDirection, type OrderOptions } from '../../utils/order';
import { BaseRepository, type FindOptions } from './base.repository';
import Review, { type IReview } from '../models/review.model';

export interface ReviewFilterOptions {}

export interface ReviewFindOptions extends FindOptions<ReviewFilterOptions> {
  order: OrderOptions;
}

export class ReviewRepository extends BaseRepository<IReview> {
  constructor() {
    super(Review);
  }

  async findForAdmin(
    options: ReviewFindOptions,
  ): Promise<PaginatedList<IReview>> {
    const { order, pagination, search } = options;

    const query: FilterQuery<IReview> = { deletedAt: null };
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

export const reviewRepository = new ReviewRepository();
