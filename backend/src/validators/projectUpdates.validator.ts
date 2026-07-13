import { z } from "zod";
import { NextFunction, Request, Response } from "express";

export const projectUpdateValidationSchema = z
  .object({
    title: z.string().min(1),
    description: z.string().optional().nullable(),
    update_date: z.string(),
    progress_percentage: z.coerce.number().int().min(0).max(100).optional(),
    status_after_update: z.string().optional(),
    projectId: z.coerce.number().int().positive(),
  })
  .strict();

export const projectUpdateUpdateValidationSchema = projectUpdateValidationSchema
  .partial()
  .strict();

export const projectUpdateQueryValidationSchema = z
  .object({
    page: z.coerce.number().int().positive().optional(),
    per_page: z.coerce.number().int().positive().optional(),
  })
  .strict();

export const projectUpdateCreateValidator = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    projectUpdateValidationSchema.parse(req.body);
    projectUpdateQueryValidationSchema.parse(req.query);
    next();
    return;
  } catch (error) {
    next(error);
    return;
  }
};

export const projectUpdateUpdateValidator = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    projectUpdateUpdateValidationSchema.parse(req.body);
    projectUpdateQueryValidationSchema.parse(req.query);
    next();
    return;
  } catch (error) {
    next(error);
    return;
  }
};
