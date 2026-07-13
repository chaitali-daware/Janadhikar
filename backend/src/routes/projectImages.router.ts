import { Router, RequestHandler } from "express";
import ProjectImagesController from "@/controllers/projectImages.controller";
import ProjectImagesService from "@/services/projectImages.service";
import { AppDataSource } from "@/data-source";
import { ProjectImage } from "@/entities/projectImage";
import authenticate from "@/middlewares/authenticate";
import authorization from "@/middlewares/authorization";
import logger from "@/lib/logger";
import { ROLES } from "@/lib/constants";
import {
  projectImageCreateValidator,
  projectImageUpdateValidator,
} from "@/validators/projectImages.validator";

const router = Router();
const projectImagesRepository = AppDataSource.getRepository(ProjectImage);
const projectImagesService = new ProjectImagesService(projectImagesRepository);
const projectImagesController = new ProjectImagesController(
  projectImagesService,
  logger,
);

router.post(
  "/",
  authenticate,
  authorization([ROLES.ADMIN, ROLES.MANAGER]) as RequestHandler,
  projectImageCreateValidator,
  async (req, res, next) => {
    await projectImagesController.create(req, res, next);
  },
);

router.get(
  "/",
  authenticate,
  authorization([ROLES.ADMIN, ROLES.MANAGER, ROLES.USER]) as RequestHandler,
  async (req, res, next) => {
    await projectImagesController.findAll(req, res, next);
  },
);

router.get(
  "/:id",
  authenticate,
  authorization([ROLES.ADMIN, ROLES.MANAGER, ROLES.USER]) as RequestHandler,
  async (req, res, next) => {
    await projectImagesController.findOne(req, res, next);
  },
);

router.put(
  "/:id",
  authenticate,
  authorization([ROLES.ADMIN, ROLES.MANAGER]) as RequestHandler,
  projectImageUpdateValidator,
  async (req, res, next) => {
    await projectImagesController.update(req, res, next);
  },
);

router.delete(
  "/:id",
  authenticate,
  authorization([ROLES.ADMIN, ROLES.MANAGER]) as RequestHandler,
  async (req, res, next) => {
    await projectImagesController.delete(req, res, next);
  },
);

export default router;
