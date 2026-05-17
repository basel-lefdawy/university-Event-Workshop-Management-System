import type { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt.js";
import { unauthorized } from "../utils/errors.js";

export function authenticate(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return next(unauthorized("Authentication token required"));
  }

  const token = header.slice(7);
  try {
    const payload = verifyToken(token);
    req.user = {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
    };
    next();
  } catch {
    next(unauthorized("Invalid or expired token"));
  }
}
