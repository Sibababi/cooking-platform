import { Router } from 'express';
import validator from '../middlewares/validator';
import recipesSchema from '../schemas/recipes.schema';
import restrict from '../middlewares/restrict';
import { RoleCode } from '../utils/enum';
import { authorizationMiddleware } from '../auth/authorization';
import { recipesController } from '../controllers/recipes.controller';
import authSchema from '../schemas/auth.schema';
import { authMiddleware } from '../middlewares/authJwt';
import { authController } from '../controllers/auth.controller';
const { USER, ADMIN } = RoleCode;

export class RecipesRoutes {
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

    // GET ALL RECIPES
    this.router.get(
      '/',
      restrict(USER, ADMIN),
      authorizationMiddleware.authorization,
      validator({ query: recipesSchema.recipesAll }),
      recipesController.getRecipes,
    );

    // GET RECIPES BY ID
    this.router.get(
      '/:id',
      restrict(USER, ADMIN),
      authorizationMiddleware.authorization,
      validator({ params: recipesSchema.recipesId }),
      recipesController.getRecipe,
    );

    // CREATE RECIPES
    this.router.post(
      '/',
      restrict(ADMIN),
      authorizationMiddleware.authorization,
      validator({ body: recipesSchema.recipesCreate }),
      recipesController.createRecipes,
    );

    // UPDATE RECIPES BY ID
    this.router.patch(
      '/:id',
      restrict(),
      authorizationMiddleware.authorization,
      validator({
        params: recipesSchema.recipesId,
        body: recipesSchema.recipesUpdate,
      }),
      recipesController.updateRecipes,
    );

    // DELETE RECIPES BY ID
    this.router.delete(
      '/:id',
      restrict(),
      authorizationMiddleware.authorization,
      validator({ params: recipesSchema.recipesId }),
      recipesController.deleteRecipes,
    );
  }
}

export const recipesRoutes = new RecipesRoutes();
