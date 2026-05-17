import { RegistrationStatus } from "@prisma/client";
import type { Request, Response, NextFunction } from "express";
import * as registrationService from "../services/registration.service.js";
import { badRequest } from "../utils/errors.js";

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const eventId = Number(req.body.eventId);
    const registration = await registrationService.registerForEvent(req.user!.id, eventId);
    res.status(201).json({ success: true, registration });
  } catch (err) {
    next(err);
  }
}

export async function mine(req: Request, res: Response, next: NextFunction) {
  try {
    const registrations = await registrationService.listMyRegistrations(req.user!.id);
    res.json({ success: true, registrations });
  } catch (err) {
    next(err);
  }
}

export async function forEvent(req: Request, res: Response, next: NextFunction) {
  try {
    const eventId = Number(req.params.eventId);
    const registration = await registrationService.getMyRegistrationForEvent(
      req.user!.id,
      eventId
    );
    res.json({ success: true, registration });
  } catch (err) {
    next(err);
  }
}

export async function cancel(req: Request, res: Response, next: NextFunction) {
  try {
    const registrationId = Number(req.params.id);
    await registrationService.cancelRegistration(req.user!.id, registrationId);
    res.json({ success: true, message: "Registration cancelled" });
  } catch (err) {
    next(err);
  }
}

export async function listAll(_req: Request, res: Response, next: NextFunction) {
  try {
    const registrations = await registrationService.listAllRegistrations();
    res.json({ success: true, registrations });
  } catch (err) {
    next(err);
  }
}

export async function updateStatus(req: Request, res: Response, next: NextFunction) {
  try {
    const registrationId = Number(req.params.id);
    const statusRaw = String(req.body.status ?? "").toUpperCase();

    if (statusRaw !== "ACCEPTED" && statusRaw !== "REJECTED" && statusRaw !== "PENDING") {
      throw badRequest("Status must be PENDING, ACCEPTED, or REJECTED");
    }

    const registration = await registrationService.updateRegistrationStatus(
      registrationId,
      statusRaw as RegistrationStatus
    );
    res.json({ success: true, registration });
  } catch (err) {
    next(err);
  }
}

export async function stats(_req: Request, res: Response, next: NextFunction) {
  try {
    const stats = await registrationService.getAdminStats();
    res.json({ success: true, stats });
  } catch (err) {
    next(err);
  }
}
