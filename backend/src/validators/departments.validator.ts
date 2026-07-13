import { z } from "zod";
import { NextFunction, Request, Response } from "express";

export const departmentValidationSchema = z
  .object({
    name: z.string().min(1),
    description: z.string().optional().nullable(),
  })
  .strict();

export const departmentUpdateValidationSchema = departmentValidationSchema
  .partial()
  .strict();

export const departmentQueryValidationSchema = z
  .object({
    page: z.coerce.number().int().positive().optional(),
    per_page: z.coerce.number().int().positive().optional(),
    search: z.string().optional(),
  })
  .strict();

export const departmentCreateValidator = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    departmentValidationSchema.parse(req.body);
    departmentQueryValidationSchema.parse(req.query);
    next();
    return;
  } catch (error) {
    next(error);
    return;
  }
};

export const departmentUpdateValidator = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    departmentUpdateValidationSchema.parse(req.body);
    departmentQueryValidationSchema.parse(req.query);
    next();
    return;
  } catch (error) {
    next(error);
    return;
  }
};
