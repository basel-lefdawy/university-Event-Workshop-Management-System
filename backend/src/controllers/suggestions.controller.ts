import { SuggestionStatus } from "@prisma/client";
import type { Request, Response, NextFunction } from "express";
import * as suggestionService from "../services/suggestion.service.js";
import { badRequest } from "../utils/errors.js";

export async function submit(req: Request, res: Response, next: NextFunction) {
  try {
    const suggestion = await suggestionService.submitSuggestion(req.user!.id, req.body);
    res.status(201).json({ success: true, suggestion });
  } catch (err) {
    next(err);
  }
}

export async function mine(req: Request, res: Response, next: NextFunction) {
  try {
    const suggestions = await suggestionService.listMySuggestions(req.user!.id);
    res.json({ success: true, suggestions });
  } catch (err) {
    next(err);
  }
}

export async function listAll(_req: Request, res: Response, next: NextFunction) {
  try {
    const suggestions = await suggestionService.listAllSuggestions();
    res.json({ success: true, suggestions });
  } catch (err) {
    next(err);
  }
}

export async function updateStatus(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const statusRaw = String(req.body.status ?? "").toUpperCase();

    if (statusRaw !== "ACCEPTED" && statusRaw !== "REJECTED") {
      throw badRequest("Status must be ACCEPTED or REJECTED");
    }

    const suggestion = await suggestionService.updateSuggestionStatus(
      id,
      statusRaw as SuggestionStatus,
      req.user!.id
    );
    res.json({ success: true, suggestion });
  } catch (err) {
    next(err);
  }
}
