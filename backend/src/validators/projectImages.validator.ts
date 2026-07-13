import { z } from "zod";
import { NextFunction, Request, Response } from "express";

export const projectImageValidationSchema = z
  .object({
    title: z.string().min(1),
    description: z.string().optional().nullable(),
    storage_key: z.string().min(1),
    mime_type: z.string().optional().nullable(),
    size_bytes: z.coerce.number().int().nonnegative().optional(),
    sort_order: z.coerce.number().int().nonnegative().optional(),
    projectId: z.coerce.number().int().positive(),
  })
  .strict();

export const projectImageUpdateValidationSchema = projectImageValidationSchema
  .partial()
  .strict();

export const projectImageQueryValidationSchema = z
  .object({
    page: z.coerce.number().int().positive().optional(),
    per_page: z.coerce.number().int().positive().optional(),
  })
  .strict();

export const projectImageCreateValidator = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    projectImageValidationSchema.parse(req.body);
    projectImageQueryValidationSchema.parse(req.query);
    next();
    return;
  } catch (error) {
    next(error);
    return;
  }
};

export const projectImageUpdateValidator = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    projectImageUpdateValidationSchema.parse(req.body);
    projectImageQueryValidationSchema.parse(req.query);
    next();
    return;
  } catch (error) {
    next(error);
    return;
  }
};
