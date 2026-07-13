import { Router, RequestHandler } from "express";
import DepartmentsController from "@/controllers/departments.controller";
import DepartmentsService from "@/services/departments.service";
import { AppDataSource } from "@/data-source";
import { Department } from "@/entities/department";
import authenticate from "@/middlewares/authenticate";
import authorization from "@/middlewares/authorization";
import logger from "@/lib/logger";
import { ROLES } from "@/lib/constants";
import {
  departmentCreateValidator,
  departmentUpdateValidator,
} from "@/validators/departments.validator";

const router = Router();
const departmentsRepository = AppDataSource.getRepository(Department);
const departmentsService = new DepartmentsService(departmentsRepository);
const departmentsController = new DepartmentsController(
  departmentsService,
  logger,
);

router.post(
  "/",
  authenticate,
  authorization([ROLES.ADMIN, ROLES.MANAGER]) as RequestHandler,
  departmentCreateValidator,
  async (req, res, next) => {
    await departmentsController.create(req, res, next);
  },
);

router.get(
  "/",
  authenticate,
  authorization([ROLES.ADMIN, ROLES.MANAGER, ROLES.USER]) as RequestHandler,
  async (req, res, next) => {
    await departmentsController.findAll(req, res, next);
  },
);

router.get(
  "/:id",
  authenticate,
  authorization([ROLES.ADMIN, ROLES.MANAGER, ROLES.USER]) as RequestHandler,
  async (req, res, next) => {
    await departmentsController.findOne(req, res, next);
  },
);

router.put(
  "/:id",
  authenticate,
  authorization([ROLES.ADMIN, ROLES.MANAGER]) as RequestHandler,
  departmentUpdateValidator,
  async (req, res, next) => {
    await departmentsController.update(req, res, next);
  },
);

router.delete(
  "/:id",
  authenticate,
  authorization([ROLES.ADMIN, ROLES.MANAGER]) as RequestHandler,
  async (req, res, next) => {
    await departmentsController.delete(req, res, next);
  },
);

export default router;
