import { Response, ParsedRequest } from 'express';
import { InternalError, NotFoundError } from '../core/ApiError';
import asyncHandler from '../middlewares/asyncHandler';
import { NextFunction } from 'express-serve-static-core';
import {
  ReviewFindOptions,
  reviewRepository,
} from '../database/repositories/review.repository';
import {
  IReviewAllSchema,
  IReviewIdSchema,
  IReviewCreateSchema,
  IReviewUpdateSchema,
} from '../schemas/review.schema';
import { defaultOrderParams } from '../utils/order';
import { defaultPaginationParams } from '../utils/pagination';
import { RoleCode } from '../utils/enum';
import { needRecord } from '../utils/record';

export class ReviewController {
  // Get all Reviews by author
  public getReviews = asyncHandler(
    async (
      req: ParsedRequest<void, IReviewAllSchema>,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      const options: ReviewFindOptions = {
        filter: {
          search: req.valid.query.search,
        },
        order: defaultOrderParams(
          req.valid.query.orderColumn,
          req.valid.query.orderDirection,
        ),
        pagination: defaultPaginationParams(
          req.valid.query.page,
          req.valid.query.pageSize,
        ),
      };
      const reviews = await reviewRepository.findForAdmin(options);

      res.ok({ message: 'success', data: reviews });
    },
  );

  // Get review by Id for authenticated user
  public getReview = asyncHandler(
    async (
      req: ParsedRequest<void, void, IReviewIdSchema>,
      res: Response,
    ): Promise<void> => {
      const review = needRecord(
        await reviewRepository.findById(req.valid.params.id),
        new NotFoundError('Review not found'),
      );

      res.ok({ message: 'success', data: review });
    },
  );

  // Create review handler
  public createReview = asyncHandler(
    async (
      req: ParsedRequest<IReviewCreateSchema>,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      const newReview = req.valid.body;
      const review = await reviewRepository.insert(newReview);
      if (review === null) {
        throw new InternalError();
      }
      res.created({ message: 'Review has been created', data: review });
    },
  );

  // Update review by Id for authenticated user
  public updateReview = asyncHandler(
    async (
      req: ParsedRequest<IReviewUpdateSchema, void, IReviewIdSchema>,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      const updateBody = req.valid.body;

      const review = needRecord(
        await reviewRepository.findById(req.valid.params.id),
        new NotFoundError('Review not found'),
      );

      const data = await reviewRepository.patchById(review.id, updateBody);

      res.ok({ message: 'Review has been updated', data });
    },
  );

  // Delete review by Id for authenticated user
  public deleteReview = asyncHandler(
    async (
      req: ParsedRequest<void, void, IReviewIdSchema>,
      res: Response,
    ): Promise<void> => {
      const review = needRecord(
        await reviewRepository.findById(req.valid.params.id),
        new NotFoundError('Review not found'),
      );

      await reviewRepository.deleteById(review.id);
      res.noContent({ message: 'Review deleted successfully' });
    },
  );
}

export const reviewController = new ReviewController();
