import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { Logger } from "winston";
import z from "zod";
import DepartmentsService from "@/services/departments.service";
import { ResponseWithMetadata } from "@/types/index";
import { Department } from "@/entities/department";
import { departmentQueryValidationSchema } from "@/validators/departments.validator";

class DepartmentsController {
  constructor(
    private readonly departmentsService: DepartmentsService,
    private readonly logger: Logger,
  ) {}

  async create(req: Request, res: Response, next: NextFunction) {
    const departmentData = req.body as Department;
    try {
      this.logger.info("Creating department");
      const department = await this.departmentsService.create(departmentData);
      this.logger.info(`Department created with id: ${department.id}`);
      const response: ResponseWithMetadata<Department> = {
        data: department,
        success: true,
      };
      res.json(response);
    } catch (_error: unknown) {
      this.logger.error("Error creating department");
      next(createHttpError(500, "Error creating department"));
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    const query = req.query as unknown as z.infer<
      typeof departmentQueryValidationSchema
    >;
    const page = query.page ? Number(query.page) : 1;
    const per_page = query.per_page ? Number(query.per_page) : 10;
    const skip = (page - 1) * per_page;

    try {
      this.logger.info("Fetching all departments");
      const queryBuilder =
        this.departmentsService.getQueryBuilder("department");
      if (query.search) {
        queryBuilder.where("LOWER(department.name) LIKE LOWER(:search)", {
          search: `%${query.search}%`,
        });
      }
      const [departments, total] = await queryBuilder
        .skip(skip)
        .take(per_page)
        .getManyAndCount();
      const response: ResponseWithMetadata<Department[]> = {
        meta: { page, per_page, total },
        data: departments,
        success: true,
      };
      return res.json(response);
    } catch (_error: unknown) {
      this.logger.error("Error fetching departments");
      next(createHttpError(500, "Error fetching departments"));
    }
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const department = await this.departmentsService.findOne({
        where: { id: Number(req.params.id) },
        relations: { projects: true },
      });
      if (!department) {
        throw createHttpError(404, "Department not found");
      }
      const response: ResponseWithMetadata<Department> = {
        data: department,
        success: true,
      };
      res.json(response);
    } catch (_error: unknown) {
      next(createHttpError(404, "Department not found"));
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const departmentData = req.body as Partial<Department>;
    try {
      await this.departmentsService.update(
        { id: Number(req.params.id) },
        departmentData,
      );
      const updatedDepartment = await this.departmentsService.findOne({
        where: { id: Number(req.params.id) },
      });
      if (!updatedDepartment) {
        return next(createHttpError(500, "Internal server error"));
      }
      const response: ResponseWithMetadata<typeof updatedDepartment> = {
        data: updatedDepartment,
        success: true,
      };
      res.json(response);
    } catch (_error: unknown) {
      next(createHttpError(500, "Error updating department"));
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.departmentsService.delete({
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
      next(createHttpError(500, "Error deleting department"));
    }
  }
}

export default DepartmentsController;
