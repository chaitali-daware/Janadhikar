import { Router, RequestHandler } from "express";
import ProjectUpdatesController from "@/controllers/projectUpdates.controller";
import ProjectUpdatesService from "@/services/projectUpdates.service";
import { AppDataSource } from "@/data-source";
import { ProjectUpdate } from "@/entities/projectUpdate";
import authenticate from "@/middlewares/authenticate";
import authorization from "@/middlewares/authorization";
import logger from "@/lib/logger";
import { ROLES } from "@/lib/constants";
import {
  projectUpdateCreateValidator,
  projectUpdateUpdateValidator,
} from "@/validators/projectUpdates.validator";

const router = Router();
const projectUpdatesRepository = AppDataSource.getRepository(ProjectUpdate);
const projectUpdatesService = new ProjectUpdatesService(
  projectUpdatesRepository,
);
const projectUpdatesController = new ProjectUpdatesController(
  projectUpdatesService,
  logger,
);

router.post(
  "/",
  authenticate,
  authorization([ROLES.ADMIN, ROLES.MANAGER]) as RequestHandler,
  projectUpdateCreateValidator,
  async (req, res, next) => {
    await projectUpdatesController.create(req, res, next);
  },
);

router.get(
  "/",
  authenticate,
  authorization([ROLES.ADMIN, ROLES.MANAGER, ROLES.USER]) as RequestHandler,
  async (req, res, next) => {
    await projectUpdatesController.findAll(req, res, next);
  },
);

router.get(
  "/:id",
  authenticate,
  authorization([ROLES.ADMIN, ROLES.MANAGER, ROLES.USER]) as RequestHandler,
  async (req, res, next) => {
    await projectUpdatesController.findOne(req, res, next);
  },
);

router.put(
  "/:id",
  authenticate,
  authorization([ROLES.ADMIN, ROLES.MANAGER]) as RequestHandler,
  projectUpdateUpdateValidator,
  async (req, res, next) => {
    await projectUpdatesController.update(req, res, next);
  },
);

router.delete(
  "/:id",
  authenticate,
  authorization([ROLES.ADMIN, ROLES.MANAGER]) as RequestHandler,
  async (req, res, next) => {
    await projectUpdatesController.delete(req, res, next);
  },
);

export default router;
