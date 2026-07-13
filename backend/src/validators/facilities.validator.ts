import { z } from "zod";
import { NextFunction, Request, Response } from "express";

export const facilityValidationSchema = z
  .object({
    name: z.string().min(1),
    description: z.string().optional().nullable(),
    type: z.string().optional(),
    is_active: z.boolean().optional(),
    villageId: z.coerce.number().int().positive(),
  })
  .strict();

export const facilityUpdateValidationSchema = facilityValidationSchema
  .partial()
  .strict();

export const facilityQueryValidationSchema = z
  .object({
    page: z.coerce.number().int().positive().optional(),
    per_page: z.coerce.number().int().positive().optional(),
    search: z.string().optional(),
  })
  .strict();

export const facilityCreateValidator = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    facilityValidationSchema.parse(req.body);
    facilityQueryValidationSchema.parse(req.query);
    next();
    return;
  } catch (error) {
    next(error);
    return;
  }
};

export const facilityUpdateValidator = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    facilityUpdateValidationSchema.parse(req.body);
    facilityQueryValidationSchema.parse(req.query);
    next();
    return;
  } catch (error) {
    next(error);
    return;
  }
};
