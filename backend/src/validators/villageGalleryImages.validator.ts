import { z } from "zod";
import { NextFunction, Request, Response } from "express";

export const villageGalleryImageValidationSchema = z
  .object({
    title: z.string().min(1),
    description: z.string().optional().nullable(),
    storage_key: z.string().min(1),
    mime_type: z.string().optional().nullable(),
    size_bytes: z.coerce.number().int().nonnegative().optional(),
    sort_order: z.coerce.number().int().nonnegative().optional(),
    villageId: z.coerce.number().int().positive(),
  })
  .strict();

export const villageGalleryImageUpdateValidationSchema =
  villageGalleryImageValidationSchema.partial().strict();

export const villageGalleryImageQueryValidationSchema = z
  .object({
    page: z.coerce.number().int().positive().optional(),
    per_page: z.coerce.number().int().positive().optional(),
  })
  .strict();

export const villageGalleryImageCreateValidator = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    villageGalleryImageValidationSchema.parse(req.body);
    villageGalleryImageQueryValidationSchema.parse(req.query);
    next();
    return;
  } catch (error) {
    next(error);
    return;
  }
};

export const villageGalleryImageUpdateValidator = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    villageGalleryImageUpdateValidationSchema.parse(req.body);
    villageGalleryImageQueryValidationSchema.parse(req.query);
    next();
    return;
  } catch (error) {
    next(error);
    return;
  }
};
