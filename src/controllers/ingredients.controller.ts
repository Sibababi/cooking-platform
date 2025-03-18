import { Response, ParsedRequest } from 'express';
import { InternalError, NotFoundError } from '../core/ApiError';
import asyncHandler from '../middlewares/asyncHandler';
import { NextFunction } from 'express-serve-static-core';
import {
  IngredientsFindOptions,
  ingredientsRepository,
} from '../database/repositories/ingredients.repository';
import {
  IIngredientsAllSchema,
  IIngredientsIdSchema,
  IIngredientsCreateSchema,
  IIngredientsUpdateSchema,
} from '../schemas/ingredients.schema';
import { defaultOrderParams } from '../utils/order';
import { defaultPaginationParams } from '../utils/pagination';
import { RoleCode } from '../utils/enum';
import { needRecord } from '../utils/record';

export class IngredientsController {
  // Get all Ingredients by author
  public getIngredients = asyncHandler(
    async (
      req: ParsedRequest<void, IIngredientsAllSchema>,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      const options: IngredientsFindOptions = {
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
      const ingredients = await ingredientsRepository.findForAdmin(options);

      res.ok({ message: 'success', data: ingredients });
    },
  );

  // Get ingredients by Id for authenticated user
  public getIngredient = asyncHandler(
    async (
      req: ParsedRequest<void, void, IIngredientsIdSchema>,
      res: Response,
    ): Promise<void> => {
      const ingredients = needRecord(
        await ingredientsRepository.findById(req.valid.params.id),
        new NotFoundError('Ingredients not found'),
      );

      res.ok({ message: 'success', data: ingredients });
    },
  );

  // Create ingredients handler
  public createIngredients = asyncHandler(
    async (
      req: ParsedRequest<IIngredientsCreateSchema>,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      const newIngredients = req.valid.body;
      const ingredients = await ingredientsRepository.insert(newIngredients);
      if (ingredients === null) {
        throw new InternalError();
      }
      res.created({
        message: 'Ingredients has been created',
        data: ingredients,
      });
    },
  );

  // Update ingredients by Id for authenticated user
  public updateIngredients = asyncHandler(
    async (
      req: ParsedRequest<IIngredientsUpdateSchema, void, IIngredientsIdSchema>,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      const updateBody = req.valid.body;

      const ingredients = needRecord(
        await ingredientsRepository.findById(req.valid.params.id),
        new NotFoundError('Ingredients not found'),
      );

      const data = await ingredientsRepository.patchById(
        ingredients.id,
        updateBody,
      );

      res.ok({ message: 'Ingredients has been updated', data });
    },
  );

  // Delete ingredients by Id for authenticated user
  public deleteIngredients = asyncHandler(
    async (
      req: ParsedRequest<void, void, IIngredientsIdSchema>,
      res: Response,
    ): Promise<void> => {
      const ingredients = needRecord(
        await ingredientsRepository.findById(req.valid.params.id),
        new NotFoundError('Ingredients not found'),
      );

      await ingredientsRepository.deleteById(ingredients.id);
      res.noContent({ message: 'Ingredients deleted successfully' });
    },
  );
}

export const ingredientsController = new IngredientsController();
