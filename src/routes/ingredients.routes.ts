import { Router } from 'express';
import validator from '../middlewares/validator';
import ingredientsSchema from '../schemas/ingredients.schema';
import restrict from '../middlewares/restrict';
import { RoleCode } from '../utils/enum';
import { authorizationMiddleware } from '../auth/authorization';
import { ingredientsController } from '../controllers/ingredients.controller';
import authSchema from '../schemas/auth.schema';
import { authMiddleware } from '../middlewares/authJwt';
import { authController } from '../controllers/auth.controller';
const { USER, ADMIN } = RoleCode;

export class IngredientsRoutes {
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

    // GET ALL INGREDIENTS
    this.router.get(
      '/',
      restrict(USER, ADMIN),
      authorizationMiddleware.authorization,
      validator({ query: ingredientsSchema.ingredientsAll }),
      ingredientsController.getIngredients,
    );

    // GET INGREDIENTS BY ID
    this.router.get(
      '/:id',
      restrict(USER, ADMIN),
      authorizationMiddleware.authorization,
      validator({ params: ingredientsSchema.ingredientsId }),
      ingredientsController.getIngredient,
    );

    // CREATE INGREDIENTS
    this.router.post(
      '/',
      restrict(),
      authorizationMiddleware.authorization,
      validator({ body: ingredientsSchema.ingredientsCreate }),
      ingredientsController.createIngredients,
    );

    // UPDATE INGREDIENTS BY ID
    this.router.patch(
      '/:id',
      restrict(),
      authorizationMiddleware.authorization,
      validator({
        params: ingredientsSchema.ingredientsId,
        body: ingredientsSchema.ingredientsUpdate,
      }),
      ingredientsController.updateIngredients,
    );

    // DELETE INGREDIENTS BY ID
    this.router.delete(
      '/:id',
      restrict(),
      authorizationMiddleware.authorization,
      validator({ params: ingredientsSchema.ingredientsId }),
      ingredientsController.deleteIngredients,
    );
  }
}

export const ingredientsRoutes = new IngredientsRoutes();
