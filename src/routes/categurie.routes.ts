import { Router } from 'express';
import validator from '../middlewares/validator';
import categurieSchema from '../schemas/categurie.schema';
import restrict from '../middlewares/restrict';
import { RoleCode } from '../utils/enum';
import { authorizationMiddleware } from '../auth/authorization';
import { categurieController } from '../controllers/categurie.controller';
import authSchema from '../schemas/auth.schema';
import { authMiddleware } from '../middlewares/authJwt';
import { authController } from '../controllers/auth.controller';
const { USER, ADMIN } = RoleCode;

export class CategurieRoutes {
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

    // GET ALL CATEGURIES
    this.router.get(
      '/',
      restrict(USER, ADMIN),
      authorizationMiddleware.authorization,
      validator({ query: categurieSchema.categurieAll }),
      categurieController.getCateguries,
    );

    // GET CATEGURIE BY ID
    this.router.get(
      '/:id',
      restrict(USER, ADMIN),
      authorizationMiddleware.authorization,
      validator({ params: categurieSchema.categurieId }),
      categurieController.getCategurie,
    );

    // CREATE CATEGURIE
    this.router.post(
      '/',
      restrict(ADMIN),
      authorizationMiddleware.authorization,
      validator({ body: categurieSchema.categurieCreate }),
      categurieController.createCategurie,
    );

    // UPDATE CATEGURIE BY ID
    this.router.patch(
      '/:id',
      restrict(ADMIN),
      authorizationMiddleware.authorization,
      validator({
        params: categurieSchema.categurieId,
        body: categurieSchema.categurieUpdate,
      }),
      categurieController.updateCategurie,
    );

    // DELETE CATEGURIE BY ID
    this.router.delete(
      '/:id',
      restrict(ADMIN),
      authorizationMiddleware.authorization,
      validator({ params: categurieSchema.categurieId }),
      categurieController.deleteCategurie,
    );
  }
}

export const categurieRoutes = new CategurieRoutes();
