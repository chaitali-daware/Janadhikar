import { Router, RequestHandler } from "express";
import VillagesController from "@/controllers/villages.controller";
import VillagesService from "@/services/villages.service";
import { AppDataSource } from "@/data-source";
import { Village } from "@/entities/village";
import authenticate from "@/middlewares/authenticate";
import authorization from "@/middlewares/authorization";
import logger from "@/lib/logger";
import { ROLES } from "@/lib/constants";
import {
  villageCreateValidator,
  villageUpdateValidator,
} from "@/validators/villages.validator";

const router = Router();

const villagesRepository = AppDataSource.getRepository(Village);
const villagesService = new VillagesService(villagesRepository);
const villagesController = new VillagesController(villagesService, logger);

router.post(
  "/",
  authenticate,
  authorization([ROLES.ADMIN, ROLES.MANAGER]) as RequestHandler,
  villageCreateValidator,
  async (req, res, next) => {
    await villagesController.create(req, res, next);
  },
);

router.get(
  "/",
  authenticate,
  authorization([ROLES.ADMIN, ROLES.MANAGER, ROLES.USER]) as RequestHandler,
  async (req, res, next) => {
    await villagesController.findAll(req, res, next);
  },
);

router.get(
  "/:id",
  authenticate,
  authorization([ROLES.ADMIN, ROLES.MANAGER, ROLES.USER]) as RequestHandler,
  async (req, res, next) => {
    await villagesController.findOne(req, res, next);
  },
);

router.put(
  "/:id",
  authenticate,
  authorization([ROLES.ADMIN, ROLES.MANAGER]) as RequestHandler,
  villageUpdateValidator,
  async (req, res, next) => {
    await villagesController.update(req, res, next);
  },
);

router.delete(
  "/:id",
  authenticate,
  authorization([ROLES.ADMIN, ROLES.MANAGER]) as RequestHandler,
  async (req, res, next) => {
    await villagesController.delete(req, res, next);
  },
);

export default router;
