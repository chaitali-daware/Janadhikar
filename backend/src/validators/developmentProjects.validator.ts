import { z } from "zod";
import { NextFunction, Request, Response } from "express";

export const developmentProjectValidationSchema = z
  .object({
    name: z.string().min(1),
    category: z.string().optional(),
    description: z.string().optional().nullable(),
    status: z.string().optional(),
    approval_date: z.string().optional().nullable(),
    start_date: z.string().optional().nullable(),
    expected_completion_date: z.string().optional().nullable(),
    actual_completion_date: z.string().optional().nullable(),
    allocated_budget: z.coerce.number().optional(),
    spent_budget: z.coerce.number().optional(),
    progress_percentage: z.coerce.number().int().min(0).max(100).optional(),
    villageId: z.coerce.number().int().positive(),
    departmentId: z.coerce.number().int().positive(),
  })
  .strict();

export const developmentProjectUpdateValidationSchema =
  developmentProjectValidationSchema.partial().strict();

export const developmentProjectQueryValidationSchema = z
  .object({
    page: z.coerce.number().int().positive().optional(),
    per_page: z.coerce.number().int().positive().optional(),
    search: z.string().optional(),
  })
  .strict();

export const developmentProjectCreateValidator = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    developmentProjectValidationSchema.parse(req.body);
    developmentProjectQueryValidationSchema.parse(req.query);
    next();
    return;
  } catch (error) {
    next(error);
    return;
  }
};

export const developmentProjectUpdateValidator = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    developmentProjectUpdateValidationSchema.parse(req.body);
    developmentProjectQueryValidationSchema.parse(req.query);
    next();
    return;
  } catch (error) {
    next(error);
    return;
  }
};
