import type { Request, Response, NextFunction } from "express";
import * as authService from "../services/auth.service.js";

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, email, password } = req.body as {
      name: string;
      email: string;
      password: string;
    };
    const result = await authService.registerStudent(name, email, password);
    res.status(201).json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body as { email: string; password: string };
    const result = await authService.login(email, password);
    res.json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
}

export async function me(req: Request, res: Response, next: NextFunction) {
  try {
    const profile = await authService.getProfile(req.user!.id);
    res.json({ success: true, user: profile });
  } catch (err) {
    next(err);
  }
}
