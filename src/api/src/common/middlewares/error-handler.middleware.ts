import { NextFunction, Request, Response } from "express";
import Container from "typedi";
import { ErrorHandler } from "../config";
import { ErrorStatus } from "../exceptions/error-status.model";

export async function errorHandlerMiddleware(
  error: ErrorStatus,
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const errorHandler = Container.get(ErrorHandler);

  const shouldRestart = await errorHandler.handleError(error);

  const status = error.httpStatusCode || 500;
  response.status(status).json({
    status,
    message:
      error instanceof ErrorStatus ? error.message : "Something went wrong",
  });

  if (shouldRestart) {
    process.exit();
  }
}
