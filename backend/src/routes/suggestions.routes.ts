import { Router } from "express";
import { Role } from "@prisma/client";
import { body } from "express-validator";
import * as suggestionsController from "../controllers/suggestions.controller.js";
import { authenticate } from "../middleware/auth.js";
import { requireRole } from "../middleware/authorize.js";
import { validate } from "../middleware/validate.js";

const router = Router();

const suggestionRules = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("description").trim().notEmpty().withMessage("Description is required"),
  body("date").notEmpty().withMessage("Date is required"),
  body("location").trim().notEmpty().withMessage("Location is required"),
  body("category").trim().notEmpty().withMessage("Category is required"),
  body("maxAttendees").isInt({ min: 1 }).withMessage("Capacity must be at least 1"),
];

router.use(authenticate);

router.get("/me", requireRole(Role.STUDENT), suggestionsController.mine);
router.post("/", requireRole(Role.STUDENT), validate(suggestionRules), suggestionsController.submit);

router.get("/admin/all", requireRole(Role.ADMIN), suggestionsController.listAll);
router.patch(
  "/:id/status",
  requireRole(Role.ADMIN),
  validate([body("status").notEmpty()]),
  suggestionsController.updateStatus
);

export default router;
