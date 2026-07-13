import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { Logger } from "winston";
import z from "zod";
import VillagesService from "@/services/villages.service";
import { ResponseWithMetadata, Village } from "@/types/index";
import { villageQueryValidationSchema } from "@/validators/villages.validator";

class VillagesController {
  constructor(
    private readonly villagesService: VillagesService,
    private readonly logger: Logger,
  ) {}

  async create(req: Request, res: Response, next: NextFunction) {
    const villageData = req.body as Village;
    try {
      this.logger.info("Creating village");
      const village = await this.villagesService.create(villageData);
      this.logger.info(`Village created with id: ${village.id}`);
      const response: ResponseWithMetadata<Village> = {
        data: village,
        success: true,
      };
      res.json(response);
    } catch (error: unknown) {
      this.logger.error(`Error creating village: ${(error as Error).message}`);
      next(createHttpError(500, "Error creating village"));
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    const query = req.query as unknown as z.infer<
      typeof villageQueryValidationSchema
    >;
    const page = query.page ? Number(query.page) : 1;
    const per_page = query.per_page ? Number(query.per_page) : 10;
    const skip = (page - 1) * per_page;

    try {
      this.logger.info("Fetching all villages");
      const queryBuilder = this.villagesService.getQueryBuilder("village");

      if (query.search) {
        queryBuilder.where("LOWER(village.name) LIKE LOWER(:search)", {
          search: `%${query.search}%`,
        });
      }

      const [villages, total] = await queryBuilder
        .skip(skip)
        .take(per_page)
        .getManyAndCount();

      const response: ResponseWithMetadata<Village[]> = {
        meta: {
          page,
          per_page,
          total,
        },
        data: villages,
        success: true,
      };
      return res.json(response);
    } catch (error: unknown) {
      this.logger.error(`Error fetching villages: ${(error as Error).message}`);
      next(createHttpError(500, "Error fetching villages"));
    }
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      this.logger.info(`Fetching village with id: ${req.params.id}`);
      const village = await this.villagesService.findOne({
        where: { id: Number(req.params.id) },
        relations: {
          facilities: true,
          developmentProjects: true,
          galleryImages: true,
        },
      });

      if (!village) {
        throw createHttpError(404, "Village not found");
      }

      const response: ResponseWithMetadata<Village> = {
        data: village,
        success: true,
      };
      res.json(response);
    } catch (error: unknown) {
      this.logger.error(
        `Error fetching village with id: ${req.params.id}: ${(error as Error).message}`,
      );
      next(createHttpError(404, "Village not found"));
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const villageData = req.body as Partial<Village>;
    try {
      this.logger.info(`Updating village with id: ${req.params.id}`);
      await this.villagesService.update(
        { id: Number(req.params.id) },
        villageData,
      );

      const updatedVillage = await this.villagesService.findOne({
        where: { id: Number(req.params.id) },
      });

      if (!updatedVillage) {
        return next(createHttpError(500, "Internal server error"));
      }

      const response: ResponseWithMetadata<typeof updatedVillage> = {
        data: updatedVillage,
        success: true,
      };
      res.json(response);
    } catch (error: unknown) {
      this.logger.error(
        `Error updating village with id: ${req.params.id}: ${(error as Error).message}`,
      );
      next(createHttpError(500, "Error updating village"));
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      this.logger.info(`Deleting village with id: ${req.params.id}`);
      const result = await this.villagesService.delete({
        id: Number(req.params.id),
      });

      const response: ResponseWithMetadata<{
        affected: number | null | undefined;
      }> = {
        data: { affected: result.affected },
        success: true,
      };
      res.json(response);
    } catch (error: unknown) {
      this.logger.error(
        `Error deleting village with id: ${req.params.id}: ${(error as Error).message}`,
      );
      next(createHttpError(500, "Error deleting village"));
    }
  }
}

export default VillagesController;
