import { Router, RequestHandler } from "express";
import VillageGalleryImagesController from "@/controllers/villageGalleryImages.controller";
import VillageGalleryImagesService from "@/services/villageGalleryImages.service";
import { AppDataSource } from "@/data-source";
import { VillageGalleryImage } from "@/entities/villageGalleryImage";
import authenticate from "@/middlewares/authenticate";
import authorization from "@/middlewares/authorization";
import logger from "@/lib/logger";
import { ROLES } from "@/lib/constants";
import {
  villageGalleryImageCreateValidator,
  villageGalleryImageUpdateValidator,
} from "@/validators/villageGalleryImages.validator";

const router = Router();
const villageGalleryImagesRepository =
  AppDataSource.getRepository(VillageGalleryImage);
const villageGalleryImagesService = new VillageGalleryImagesService(
  villageGalleryImagesRepository,
);
const villageGalleryImagesController = new VillageGalleryImagesController(
  villageGalleryImagesService,
  logger,
);

router.post(
  "/",
  authenticate,
  authorization([ROLES.ADMIN, ROLES.MANAGER]) as RequestHandler,
  villageGalleryImageCreateValidator,
  async (req, res, next) => {
    await villageGalleryImagesController.create(req, res, next);
  },
);

router.get(
  "/",
  authenticate,
  authorization([ROLES.ADMIN, ROLES.MANAGER, ROLES.USER]) as RequestHandler,
  async (req, res, next) => {
    await villageGalleryImagesController.findAll(req, res, next);
  },
);

router.get(
  "/:id",
  authenticate,
  authorization([ROLES.ADMIN, ROLES.MANAGER, ROLES.USER]) as RequestHandler,
  async (req, res, next) => {
    await villageGalleryImagesController.findOne(req, res, next);
  },
);

router.put(
  "/:id",
  authenticate,
  authorization([ROLES.ADMIN, ROLES.MANAGER]) as RequestHandler,
  villageGalleryImageUpdateValidator,
  async (req, res, next) => {
    await villageGalleryImagesController.update(req, res, next);
  },
);

router.delete(
  "/:id",
  authenticate,
  authorization([ROLES.ADMIN, ROLES.MANAGER]) as RequestHandler,
  async (req, res, next) => {
    await villageGalleryImagesController.delete(req, res, next);
  },
);

export default router;
