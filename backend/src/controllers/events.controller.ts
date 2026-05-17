import type { Request, Response, NextFunction } from "express";
import * as eventService from "../services/event.service.js";

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const events = await eventService.listEvents();
    res.json({ success: true, events });
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const event = await eventService.getEventById(id);
    res.json({ success: true, event });
  } catch (err) {
    next(err);
  }
}
