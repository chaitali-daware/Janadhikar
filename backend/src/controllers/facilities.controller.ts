import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { Logger } from "winston";
import z from "zod";
import FacilitiesService from "@/services/facilities.service";
import { ResponseWithMetadata } from "@/types/index";
import { Facility } from "@/entities/facility";
import { facilityQueryValidationSchema } from "@/validators/facilities.validator";

class FacilitiesController {
    constructor(
        private readonly facilitiesService: FacilitiesService,
        private readonly logger: Logger,
    ) { }

    async create(req: Request, res: Response, next: NextFunction) {
        const facilityData = req.body as Facility;
        try {
            this.logger.info("Creating facility");
            const facility = await this.facilitiesService.create(facilityData);
            this.logger.info(`Facility created with id: ${facility.id}`);
            const response: ResponseWithMetadata<Facility> = {
                data: facility,
                success: true,
            };
            res.json(response);
        } catch (_error: unknown) {
            this.logger.error("Error creating facility", _error);
            next(createHttpError(500, "Error creating facility"));
        }
    }

    async findAll(req: Request, res: Response, next: NextFunction) {
        const query = req.query as unknown as z.infer<
            typeof facilityQueryValidationSchema
        >;
        const page = query.page ? Number(query.page) : 1;
        const per_page = query.per_page ? Number(query.per_page) : 10;
        const skip = (page - 1) * per_page;
        try {
            const queryBuilder = this.facilitiesService.getQueryBuilder("facility");
            if (query.search) {
                queryBuilder.where("LOWER(facility.name) LIKE LOWER(:search)", {
                    search: `%${query.search}%`,
                });
            }
            const [facilities, total] = await queryBuilder
                .skip(skip)
                .take(per_page)
                .getManyAndCount();
            const response: ResponseWithMetadata<Facility[]> = {
                meta: { page, per_page, total },
                data: facilities,
                success: true,
            };
            return res.json(response);
        } catch (_error: unknown) {
            next(createHttpError(500, "Error fetching facilities"));
        }
    }

    async findOne(req: Request, res: Response, next: NextFunction) {
        try {
            const facility = await this.facilitiesService.findOne({
                where: { id: Number(req.params.id) },
                relations: { village: true },
            });
            if (!facility) {
                throw createHttpError(404, "Facility not found");
            }
            const response: ResponseWithMetadata<Facility> = {
                data: facility,
                success: true,
            };
            res.json(response);
        } catch (_error: unknown) {
            next(createHttpError(404, "Facility not found"));
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        const facilityData = req.body as Partial<Facility>;
        try {
            await this.facilitiesService.update(
                { id: Number(req.params.id) },
                facilityData,
            );
            const updatedFacility = await this.facilitiesService.findOne({
                where: { id: Number(req.params.id) },
            });
            if (!updatedFacility) {
                return next(createHttpError(500, "Internal server error"));
            }
            const response: ResponseWithMetadata<typeof updatedFacility> = {
                data: updatedFacility,
                success: true,
            };
            res.json(response);
        } catch (_error: unknown) {
            next(createHttpError(500, "Error updating facility"));
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.facilitiesService.delete({
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
            next(createHttpError(500, "Error deleting facility"));
        }
    }
}

export default FacilitiesController;
