import { Response, ParsedRequest } from 'express';
import { InternalError, NotFoundError } from '../core/ApiError';
import asyncHandler from '../middlewares/asyncHandler';
import { NextFunction } from 'express-serve-static-core';
import {
  RecipesFindOptions,
  recipesRepository,
} from '../database/repositories/recipes.repository';
import {
  IRecipesAllSchema,
  IRecipesIdSchema,
  IRecipesCreateSchema,
  IRecipesUpdateSchema,
} from '../schemas/recipes.schema';
import { defaultOrderParams } from '../utils/order';
import { defaultPaginationParams } from '../utils/pagination';
import { RoleCode } from '../utils/enum';
import { needRecord } from '../utils/record';

export class RecipesController {
  // Get all Recipes by author
  public getRecipes = asyncHandler(
    async (
      req: ParsedRequest<void, IRecipesAllSchema>,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      const options: RecipesFindOptions = {
        filter: {
          
        },
        order: defaultOrderParams(
          req.valid.query.orderColumn,
          req.valid.query.orderDirection,
        ),
        pagination: defaultPaginationParams(
          req.valid.query.page,
          req.valid.query.pageSize,
        ),
        search: req.valid.query.search,
      };
      const recipes = await recipesRepository.findForAdmin(options);

      res.ok({ message: 'success', data: recipes });
    },
  );

  // Get recipes by Id for authenticated user
  public getRecipe = asyncHandler(
    async (
      req: ParsedRequest<void, void, IRecipesIdSchema>,
      res: Response,
      next: NextFunction,
    ) => {
      const recipe = needRecord(
        await recipesRepository.findById(req.valid.params.id),
        new NotFoundError('Recipes not found'),
      );
     
      res.ok({ message: 'success', data: recipe });
    },
  );

  // Create recipes handler
  public createRecipes = asyncHandler(
    async (
      req: ParsedRequest<IRecipesCreateSchema>,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      const newRecipes = req.valid.body;
      const recipes = await recipesRepository.insert(newRecipes);
      if (recipes === null) {
        throw new InternalError();
      }
      res.created({ message: 'Recipes has been created', data: recipes });
    },
  );

  // Update recipes by Id for authenticated user
  public updateRecipes = asyncHandler(
    async (
      req: ParsedRequest<IRecipesUpdateSchema, void, IRecipesIdSchema>,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      const updateBody = req.valid.body;

      const recipes = needRecord(
        await recipesRepository.findById(req.valid.params.id),
        new NotFoundError('Recipes not found'),
      );

      const data = await recipesRepository.patchById(recipes.id, updateBody);

      res.ok({ message: 'Recipes has been updated', data });
    },
  );

  // Delete recipes by Id for authenticated user
  public deleteRecipes = asyncHandler(
    async (
      req: ParsedRequest<void, void, IRecipesIdSchema>,
      res: Response,
    ): Promise<void> => {
      const recipes = needRecord(
        await recipesRepository.findById(req.valid.params.id),
        new NotFoundError('Recipes not found'),
      );

      await recipesRepository.deleteById(recipes.id);
      res.noContent({ message: 'Recipes deleted successfully' });
    },
  );
}

export const recipesController = new RecipesController();
