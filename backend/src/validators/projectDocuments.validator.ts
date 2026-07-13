import { z } from "zod";
import { NextFunction, Request, Response } from "express";

export const projectDocumentValidationSchema = z
  .object({
    title: z.string().min(1),
    description: z.string().optional().nullable(),
    storage_key: z.string().min(1),
    mime_type: z.string().optional().nullable(),
    size_bytes: z.coerce.number().int().nonnegative().optional(),
    document_type: z.string().optional().nullable(),
    projectId: z.coerce.number().int().positive(),
  })
  .strict();

export const projectDocumentUpdateValidationSchema =
  projectDocumentValidationSchema.partial().strict();

export const projectDocumentQueryValidationSchema = z
  .object({
    page: z.coerce.number().int().positive().optional(),
    per_page: z.coerce.number().int().positive().optional(),
  })
  .strict();

export const projectDocumentCreateValidator = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    projectDocumentValidationSchema.parse(req.body);
    projectDocumentQueryValidationSchema.parse(req.query);
    next();
    return;
  } catch (error) {
    next(error);
    return;
  }
};

export const projectDocumentUpdateValidator = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    projectDocumentUpdateValidationSchema.parse(req.body);
    projectDocumentQueryValidationSchema.parse(req.query);
    next();
    return;
  } catch (error) {
    next(error);
    return;
  }
};
