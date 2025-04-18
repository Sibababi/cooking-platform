import { Response, ParsedRequest } from 'express';
import { InternalError, NotFoundError } from '../core/ApiError';
import asyncHandler from '../middlewares/asyncHandler';
import { NextFunction } from 'express-serve-static-core';
import {
  CategurieFindOptions,
  categurieRepository,
} from '../database/repositories/categurie.repository';
import {
  ICategurieAllSchema,
  ICategurieIdSchema,
  ICategurieCreateSchema,
  ICategurieUpdateSchema,
} from '../schemas/categurie.schema';
import { defaultOrderParams } from '../utils/order';
import { defaultPaginationParams } from '../utils/pagination';
import { RoleCode } from '../utils/enum';
import { needRecord } from '../utils/record';

export class CategurieController {
  // Get all Categuries by author
  public getCateguries = asyncHandler(
    async (
      req: ParsedRequest<void, ICategurieAllSchema>,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      const options: CategurieFindOptions = {
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
      const categuries = await categurieRepository.findForAdmin(options);

      res.ok({ message: 'success', data: categuries });
    },
  );

  // Get categurie by Id for authenticated user
  public getCategurie = asyncHandler(
    async (
      req: ParsedRequest<void, void, ICategurieIdSchema>,
      res: Response,
    ): Promise<void> => {
      const categurie = needRecord(
        await categurieRepository.findById(req.valid.params.id),
        new NotFoundError('Categurie not found'),
      );
      console.log(categurie);

      res.ok({ message: 'success', data: categurie });
    },
  );

  // Create categurie handler
  public createCategurie = asyncHandler(
    async (
      req: ParsedRequest<ICategurieCreateSchema>,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      const newCategurie = req.valid.body;
      const categurie = await categurieRepository.insert(newCategurie);
      if (categurie === null) {
        throw new InternalError();
      }
      res.created({ message: 'Categurie has been created', data: categurie });
    },
  );

  // Update categurie by Id for authenticated user
  public updateCategurie = asyncHandler(
    async (
      req: ParsedRequest<ICategurieUpdateSchema, void, ICategurieIdSchema>,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      const updateBody = req.valid.body;

      const categurie = needRecord(
        await categurieRepository.findById(req.valid.params.id),
        new NotFoundError('Categurie not found'),
      );

      const data = await categurieRepository.patchById(
        categurie.id,
        updateBody,
      );

      res.ok({ message: 'Categurie has been updated', data });
    },
  );

  // Delete categurie by Id for authenticated user
  public deleteCategurie = asyncHandler(
    async (
      req: ParsedRequest<void, void, ICategurieIdSchema>,
      res: Response,
    ): Promise<void> => {
      const categurie = needRecord(
        await categurieRepository.findById(req.valid.params.id),
        new NotFoundError('Categurie not found'),
      );

      await categurieRepository.deleteById(categurie.id);
      res.noContent({ message: 'Categurie deleted successfully' });
    },
  );
}

export const categurieController = new CategurieController();
