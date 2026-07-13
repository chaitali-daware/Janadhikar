import { z } from "zod";
import { NextFunction, Request, Response } from "express";

export const villageValidationSchema = z
  .object({
    name: z.string().min(1),
    district: z.string().min(1),
    taluka: z.string().min(1),
    state: z.string().min(1),
    pincode: z.string().max(10).optional().nullable(),
    latitude: z.coerce.number().optional().nullable(),
    longitude: z.coerce.number().optional().nullable(),
    population: z.coerce.number().int().positive().optional().nullable(),
    area_sq_km: z.coerce.number().positive().optional().nullable(),
    created_by_user_id: z.coerce
      .number()
      .int()
      .positive()
      .optional()
      .nullable(),
  })
  .strict();

export const villageUpdateValidationSchema = villageValidationSchema
  .partial()
  .strict();

export const villageQueryValidationSchema = z
  .object({
    page: z.coerce.number().int().positive().optional(),
    per_page: z.coerce.number().int().positive().optional(),
    search: z.string().optional(),
  })
  .strict();

export const villageCreateValidator = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    villageValidationSchema.parse(req.body);
    villageQueryValidationSchema.parse(req.query);
    next();
    return;
  } catch (error) {
    next(error);
    return;
  }
};

export const villageUpdateValidator = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    villageUpdateValidationSchema.parse(req.body);
    villageQueryValidationSchema.parse(req.query);
    next();
    return;
  } catch (error) {
    next(error);
    return;
  }
};
