import { Router } from 'express';
import validator from '../middlewares/validator';
import reviewSchema from '../schemas/review.schema';
import restrict from '../middlewares/restrict';
import { RoleCode } from '../utils/enum';
import { authorizationMiddleware } from '../auth/authorization';
import { reviewController } from '../controllers/review.controller';
import authSchema from '../schemas/auth.schema';
import { authMiddleware } from '../middlewares/authJwt';
import { authController } from '../controllers/auth.controller';
const { USER, ADMIN } = RoleCode;

export class ReviewRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    // PROTECTED ROUTES
    this.router.use(
      validator({ headers: authSchema.auth }),
      authMiddleware.authenticateJWT,
    );

    // GET ALL REVIEWS
    this.router.get(
      '/',
      restrict(USER, ADMIN),
      authorizationMiddleware.authorization,
      validator({ query: reviewSchema.reviewAll }),
      reviewController.getReviews,
    );

    // GET REVIEW BY ID
    this.router.get(
      '/:id',
      restrict(USER, ADMIN),
      authorizationMiddleware.authorization,
      validator({ params: reviewSchema.reviewId }),
      reviewController.getReview,
    );

    // CREATE REVIEW
    this.router.post(
      '/',
      restrict(USER),
      authorizationMiddleware.authorization,
      validator({ body: reviewSchema.reviewCreate }),
      reviewController.createReview,
    );

    // UPDATE REVIEW BY ID
    this.router.patch(
      '/:id',
      restrict(USER),
      authorizationMiddleware.authorization,
      validator({
        params: reviewSchema.reviewId,
        body: reviewSchema.reviewUpdate,
      }),
      reviewController.updateReview,
    );

    // DELETE REVIEW BY ID
    this.router.delete(
      '/:id',
      restrict(USER, ADMIN),
      authorizationMiddleware.authorization,
      validator({ params: reviewSchema.reviewId }),
      reviewController.deleteReview,
    );
  }
}

export const reviewRoutes = new ReviewRoutes();
