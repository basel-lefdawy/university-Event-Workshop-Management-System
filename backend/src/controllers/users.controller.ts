import type { Request, Response, NextFunction } from "express";
import * as userService from "../services/user.service.js";

export async function list(_req: Request, res: Response, next: NextFunction) {
  try {
    const users = await userService.listUsers();
    res.json({ success: true, users });
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = Number(req.params.id);
    await userService.deleteUser(userId, req.user!.id);
    res.json({ success: true, message: "User deleted" });
  } catch (err) {
    next(err);
  }
}
