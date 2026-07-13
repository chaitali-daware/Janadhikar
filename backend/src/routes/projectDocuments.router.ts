import { Router, RequestHandler } from "express";
import ProjectDocumentsController from "@/controllers/projectDocuments.controller";
import ProjectDocumentsService from "@/services/projectDocuments.service";
import { AppDataSource } from "@/data-source";
import { ProjectDocument } from "@/entities/projectDocument";
import authenticate from "@/middlewares/authenticate";
import authorization from "@/middlewares/authorization";
import logger from "@/lib/logger";
import { ROLES } from "@/lib/constants";
import {
  projectDocumentCreateValidator,
  projectDocumentUpdateValidator,
} from "@/validators/projectDocuments.validator";

const router = Router();
const projectDocumentsRepository = AppDataSource.getRepository(ProjectDocument);
const projectDocumentsService = new ProjectDocumentsService(
  projectDocumentsRepository,
);
const projectDocumentsController = new ProjectDocumentsController(
  projectDocumentsService,
  logger,
);

router.post(
  "/",
  authenticate,
  authorization([ROLES.ADMIN, ROLES.MANAGER]) as RequestHandler,
  projectDocumentCreateValidator,
  async (req, res, next) => {
    await projectDocumentsController.create(req, res, next);
  },
);

router.get(
  "/",
  authenticate,
  authorization([ROLES.ADMIN, ROLES.MANAGER, ROLES.USER]) as RequestHandler,
  async (req, res, next) => {
    await projectDocumentsController.findAll(req, res, next);
  },
);

router.get(
  "/:id",
  authenticate,
  authorization([ROLES.ADMIN, ROLES.MANAGER, ROLES.USER]) as RequestHandler,
  async (req, res, next) => {
    await projectDocumentsController.findOne(req, res, next);
  },
);

router.put(
  "/:id",
  authenticate,
  authorization([ROLES.ADMIN, ROLES.MANAGER]) as RequestHandler,
  projectDocumentUpdateValidator,
  async (req, res, next) => {
    await projectDocumentsController.update(req, res, next);
  },
);

router.delete(
  "/:id",
  authenticate,
  authorization([ROLES.ADMIN, ROLES.MANAGER]) as RequestHandler,
  async (req, res, next) => {
    await projectDocumentsController.delete(req, res, next);
  },
);

export default router;
