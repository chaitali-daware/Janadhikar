import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { Logger } from "winston";
import z from "zod";
import ProjectDocumentsService from "@/services/projectDocuments.service";
import { ResponseWithMetadata } from "@/types/index";
import { ProjectDocument } from "@/entities/projectDocument";
import { projectDocumentQueryValidationSchema } from "@/validators/projectDocuments.validator";

class ProjectDocumentsController {
  constructor(
    private readonly projectDocumentsService: ProjectDocumentsService,
    private readonly logger: Logger,
  ) {}

  async create(req: Request, res: Response, next: NextFunction) {
    const documentData = req.body as ProjectDocument;
    try {
      const document = await this.projectDocumentsService.create(documentData);
      const response: ResponseWithMetadata<ProjectDocument> = {
        data: document,
        success: true,
      };
      res.json(response);
    } catch (_error: unknown) {
      next(createHttpError(500, "Error creating project document"));
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    const query = req.query as unknown as z.infer<
      typeof projectDocumentQueryValidationSchema
    >;
    const page = query.page ? Number(query.page) : 1;
    const per_page = query.per_page ? Number(query.per_page) : 10;
    const skip = (page - 1) * per_page;
    try {
      const queryBuilder =
        this.projectDocumentsService.getQueryBuilder("document");
      const [documents, total] = await queryBuilder
        .skip(skip)
        .take(per_page)
        .getManyAndCount();
      const response: ResponseWithMetadata<ProjectDocument[]> = {
        meta: { page, per_page, total },
        data: documents,
        success: true,
      };
      return res.json(response);
    } catch (_error: unknown) {
      next(createHttpError(500, "Error fetching project documents"));
    }
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const document = await this.projectDocumentsService.findOne({
        where: { id: Number(req.params.id) },
        relations: { project: true },
      });
      if (!document) {
        throw createHttpError(404, "Project document not found");
      }
      const response: ResponseWithMetadata<ProjectDocument> = {
        data: document,
        success: true,
      };
      res.json(response);
    } catch (_error: unknown) {
      next(createHttpError(404, "Project document not found"));
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const documentData = req.body as Partial<ProjectDocument>;
    try {
      await this.projectDocumentsService.update(
        { id: Number(req.params.id) },
        documentData,
      );
      const updatedDocument = await this.projectDocumentsService.findOne({
        where: { id: Number(req.params.id) },
      });
      if (!updatedDocument) {
        return next(createHttpError(500, "Internal server error"));
      }
      const response: ResponseWithMetadata<typeof updatedDocument> = {
        data: updatedDocument,
        success: true,
      };
      res.json(response);
    } catch (_error: unknown) {
      next(createHttpError(500, "Error updating project document"));
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.projectDocumentsService.delete({
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
      next(createHttpError(500, "Error deleting project document"));
    }
  }
}

export default ProjectDocumentsController;
