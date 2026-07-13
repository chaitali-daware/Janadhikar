import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { Logger } from "winston";
import z from "zod";
import VillageGalleryImagesService from "@/services/villageGalleryImages.service";
import { ResponseWithMetadata } from "@/types/index";
import { VillageGalleryImage } from "@/entities/villageGalleryImage";
import { villageGalleryImageQueryValidationSchema } from "@/validators/villageGalleryImages.validator";

class VillageGalleryImagesController {
  constructor(
    private readonly villageGalleryImagesService: VillageGalleryImagesService,
    private readonly logger: Logger,
  ) {}

  async create(req: Request, res: Response, next: NextFunction) {
    const imageData = req.body as VillageGalleryImage;
    try {
      const image = await this.villageGalleryImagesService.create(imageData);
      const response: ResponseWithMetadata<VillageGalleryImage> = {
        data: image,
        success: true,
      };
      res.json(response);
    } catch (_error: unknown) {
      next(createHttpError(500, "Error creating village gallery image"));
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    const query = req.query as unknown as z.infer<
      typeof villageGalleryImageQueryValidationSchema
    >;
    const page = query.page ? Number(query.page) : 1;
    const per_page = query.per_page ? Number(query.per_page) : 10;
    const skip = (page - 1) * per_page;
    try {
      const queryBuilder =
        this.villageGalleryImagesService.getQueryBuilder("image");
      const [images, total] = await queryBuilder
        .skip(skip)
        .take(per_page)
        .getManyAndCount();
      const response: ResponseWithMetadata<VillageGalleryImage[]> = {
        meta: { page, per_page, total },
        data: images,
        success: true,
      };
      return res.json(response);
    } catch (_error: unknown) {
      next(createHttpError(500, "Error fetching village gallery images"));
    }
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const image = await this.villageGalleryImagesService.findOne({
        where: { id: Number(req.params.id) },
        relations: { village: true },
      });
      if (!image) {
        throw createHttpError(404, "Village gallery image not found");
      }
      const response: ResponseWithMetadata<VillageGalleryImage> = {
        data: image,
        success: true,
      };
      res.json(response);
    } catch (_error: unknown) {
      next(createHttpError(404, "Village gallery image not found"));
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const imageData = req.body as Partial<VillageGalleryImage>;
    try {
      await this.villageGalleryImagesService.update(
        { id: Number(req.params.id) },
        imageData,
      );
      const updatedImage = await this.villageGalleryImagesService.findOne({
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
      next(createHttpError(500, "Error updating village gallery image"));
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.villageGalleryImagesService.delete({
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
      next(createHttpError(500, "Error deleting village gallery image"));
    }
  }
}

export default VillageGalleryImagesController;
