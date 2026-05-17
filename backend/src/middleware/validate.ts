import type { NextFunction, Request, Response } from "express";
import { validationResult, type ValidationChain } from "express-validator";
import { badRequest } from "../utils/errors.js";

export function validate(validations: ValidationChain[]) {
  return async (req: Request, _res: Response, next: NextFunction) => {
    await Promise.all(validations.map((v) => v.run(req)));
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const message = errors.array().map((e) => e.msg).join(", ");
      return next(badRequest(message));
    }
    next();
  };
}
