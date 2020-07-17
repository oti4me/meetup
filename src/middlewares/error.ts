import { Request, Response, Next } from "express";

export const notFound = (req: Request, res: Response, next: Next) => {
  res.status(404);
  const error = new Error(`Not Found - ${req.originalUrl}`);
  next(error);
};

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: Next
) => {
  const statusCode = res.statusCode || 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "" : err.stack,
  });
};
