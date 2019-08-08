import app from "./app";
import Container from "typedi";
import { ErrorHandler, Logger } from "./common/config";
import CatService from "./api/cats/cats.service";

const startServer = async () => {
  try {
    // Populate database
    await Container.get(CatService).populateCats();
  } catch (e) {
    await Container.get(Logger).winston.error(
      "Error while populating database with cats: %o",
      { ...e },
    );
    process.exit();
  }

  // Run the server
  app.listen(app.get("port"), () => {
    console.log(
      `API is running at http://localhost:${app.get("port")}/v1 in ${app.get(
        "env",
      )} mode`,
    );
  });

  process.on("SIGINT", () => {
    console.log("Process exiting...");
    process.exit();
  });

  process.on("unhandledRejection", (reason, p) => {
    throw reason;
  });

  process.on("uncaughtException", async (error) => {
    const errorHandler = Container.get(ErrorHandler);
    const shouldRestart = await errorHandler.handleError(error);
    if (shouldRestart) {
      process.exit(1);
    }
  });
};

startServer();
