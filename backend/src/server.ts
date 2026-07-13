import "reflect-metadata";
import path from "node:path";
import express, { ErrorRequestHandler, Express } from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import usersRouter from "@/routes/users.router";
import authRouter from "@/routes/authentication.router";
import villagesRouter from "@/routes/villages.router";
import departmentsRouter from "@/routes/departments.router";
import facilitiesRouter from "@/routes/facilities.router";
import developmentProjectsRouter from "@/routes/developmentProjects.router";
import projectUpdatesRouter from "@/routes/projectUpdates.router";
import projectImagesRouter from "@/routes/projectImages.router";
import projectDocumentsRouter from "@/routes/projectDocuments.router";
import villageGalleryImagesRouter from "@/routes/villageGalleryImages.router";
import errorHandler from "@/middlewares/error-handler";
import configuration from "@/lib/configuration";

export const createServer = (): Express => {
  const app = express();
  app
    .use(
      cors({
        origin: [
          configuration.cookies.domain,
          ...configuration.allowed_origins,
        ],
        credentials: true,
      }),
    )
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(morgan("dev"))
    .use(cookieParser())
    .use(
      express.static(path.join(__dirname, "..", "public"), {
        dotfiles: "allow",
      }),
    )
    .get("/status", (_, res) => {
      res.json({ ok: true });
    })
    .get("/message/:name", (req, res) => {
      res.json({ message: `hello ${req.params.name}` });
    })
    .use("/auth", authRouter)
    .use("/users", usersRouter)
    .use("/villages", villagesRouter)
    .use("/departments", departmentsRouter)
    .use("/facilities", facilitiesRouter)
    .use("/projects", developmentProjectsRouter)
    .use("/project-updates", projectUpdatesRouter)
    .use("/project-images", projectImagesRouter)
    .use("/project-documents", projectDocumentsRouter)
    .use("/village-gallery-images", villageGalleryImagesRouter)
    .use(errorHandler as unknown as ErrorRequestHandler);
  return app;
};
