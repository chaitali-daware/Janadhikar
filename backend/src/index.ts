import "reflect-metadata";
import { Express } from "express";
import { createServer } from "@/server";
import configuration from "@/lib/configuration";
import { AppDataSource } from "@/data-source";
import logger from "@/lib/logger";

const port = configuration.port;
const host = configuration.host;
const server: Express = createServer();

server.listen(port, host, async () => {
  try {
    await AppDataSource.initialize();
    logger.info("Kafka connected successfully");
    logger.info(`Server Listening on  http://${host}:${port}`);
  } catch (error: unknown) {
    console.error(error);
    process.exit(1);
  }
});
