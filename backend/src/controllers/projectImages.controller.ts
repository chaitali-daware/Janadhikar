import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { Logger } from "winston";
import z from "zod";
import ProjectImagesService from "@/services/projectImages.service";
import { ResponseWithMetadata } from "@/types/index";
import { ProjectImage } from "@/entities/projectImage";
import { projectImageQueryValidationSchema } from "@/validators/projectImages.validator";

class ProjectImagesController {
  constructor(
    private readonly projectImagesService: ProjectImagesService,
    private readonly logger: Logger,
  ) {}

  async create(req: Request, res: Response, next: NextFunction) {
    const imageData = req.body as ProjectImage;
    try {
      const image = await this.projectImagesService.create(imageData);
      const response: ResponseWithMetadata<ProjectImage> = {
        data: image,
        success: true,
      };
      res.json(response);
    } catch (_error: unknown) {
      next(createHttpError(500, "Error creating project image"));
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    const query = req.query as unknown as z.infer<
      typeof projectImageQueryValidationSchema
    >;
    const page = query.page ? Number(query.page) : 1;
    const per_page = query.per_page ? Number(query.per_page) : 10;
    const skip = (page - 1) * per_page;
    try {
      const queryBuilder = this.projectImagesService.getQueryBuilder("image");
      const [images, total] = await queryBuilder
        .skip(skip)
        .take(per_page)
        .getManyAndCount();
      const response: ResponseWithMetadata<ProjectImage[]> = {
        meta: { page, per_page, total },
        data: images,
        success: true,
      };
      return res.json(response);
    } catch (_error: unknown) {
      next(createHttpError(500, "Error fetching project images"));
    }
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const image = await this.projectImagesService.findOne({
        where: { id: Number(req.params.id) },
        relations: { project: true },
      });
      if (!image) {
        throw createHttpError(404, "Project image not found");
      }
      const response: ResponseWithMetadata<ProjectImage> = {
        data: image,
        success: true,
      };
      res.json(response);
    } catch (_error: unknown) {
      next(createHttpError(404, "Project image not found"));
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const imageData = req.body as Partial<ProjectImage>;
    try {
      await this.projectImagesService.update(
        { id: Number(req.params.id) },
        imageData,
      );
      const updatedImage = await this.projectImagesService.findOne({
        where: { id: Number(req.params.id) },
      });
      if (!updatedImage) {
        return next(createHttpError(500, "Internal server error"));
      }
      const response: ResponseWithMetadata<typeof updatedImage> = {
        data: updatedImage,
        success: true,
      };
      res.json(response);
    } catch (_error: unknown) {
      next(createHttpError(500, "Error updating project image"));
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.projectImagesService.delete({
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
      next(createHttpError(500, "Error deleting project image"));
    }
  }
}

export default ProjectImagesController;
