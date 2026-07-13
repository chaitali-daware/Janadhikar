import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { Logger } from "winston";
import z from "zod";
import ProjectUpdatesService from "@/services/projectUpdates.service";
import { ResponseWithMetadata } from "@/types/index";
import { ProjectUpdate } from "@/entities/projectUpdate";
import { projectUpdateQueryValidationSchema } from "@/validators/projectUpdates.validator";

class ProjectUpdatesController {
  constructor(
    private readonly projectUpdatesService: ProjectUpdatesService,
    private readonly logger: Logger,
  ) {}

  async create(req: Request, res: Response, next: NextFunction) {
    const updateData = req.body as ProjectUpdate;
    try {
      const update = await this.projectUpdatesService.create(updateData);
      const response: ResponseWithMetadata<ProjectUpdate> = {
        data: update,
        success: true,
      };
      res.json(response);
    } catch (_error: unknown) {
      next(createHttpError(500, "Error creating project update"));
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    const query = req.query as unknown as z.infer<
      typeof projectUpdateQueryValidationSchema
    >;
    const page = query.page ? Number(query.page) : 1;
    const per_page = query.per_page ? Number(query.per_page) : 10;
    const skip = (page - 1) * per_page;
    try {
      const queryBuilder = this.projectUpdatesService.getQueryBuilder("update");
      const [updates, total] = await queryBuilder
        .skip(skip)
        .take(per_page)
        .getManyAndCount();
      const response: ResponseWithMetadata<ProjectUpdate[]> = {
        meta: { page, per_page, total },
        data: updates,
        success: true,
      };
      return res.json(response);
    } catch (_error: unknown) {
      next(createHttpError(500, "Error fetching project updates"));
    }
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const update = await this.projectUpdatesService.findOne({
        where: { id: Number(req.params.id) },
        relations: { project: true },
      });
      if (!update) {
        throw createHttpError(404, "Project update not found");
      }
      const response: ResponseWithMetadata<ProjectUpdate> = {
        data: update,
        success: true,
      };
      res.json(response);
    } catch (_error: unknown) {
      next(createHttpError(404, "Project update not found"));
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const updateData = req.body as Partial<ProjectUpdate>;
    try {
      await this.projectUpdatesService.update(
        { id: Number(req.params.id) },
        updateData,
      );
      const updatedUpdate = await this.projectUpdatesService.findOne({
        where: { id: Number(req.params.id) },
      });
      if (!updatedUpdate) {
        return next(createHttpError(500, "Internal server error"));
      }
      const response: ResponseWithMetadata<typeof updatedUpdate> = {
        data: updatedUpdate,
        success: true,
      };
      res.json(response);
    } catch (_error: unknown) {
      next(createHttpError(500, "Error updating project update"));
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.projectUpdatesService.delete({
        id: Number(req.params.id),
      });
      const response: ResponseWithMetadata<{
        affected: number | null | undefined;
      }> = {
        data: { affected: result.affected },
        success: true,
      };
      res.json(response);
    } catch (_error: unknown) {
      next(createHttpError(500, "Error deleting project update"));
    }
  }
}

export default ProjectUpdatesController;
