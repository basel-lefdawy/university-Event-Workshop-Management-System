import { Router } from "express";
import { Role } from "@prisma/client";
import { body } from "express-validator";
import * as registrationsController from "../controllers/registrations.controller.js";
import { authenticate } from "../middleware/auth.js";
import { requireRole } from "../middleware/authorize.js";
import { validate } from "../middleware/validate.js";

const router = Router();

router.use(authenticate);

router.get("/me", registrationsController.mine);
router.get("/event/:eventId", registrationsController.forEvent);
router.post(
  "/",
  requireRole(Role.STUDENT),
  validate([
    body("eventId")
      .custom((value) => Number.isInteger(Number(value)) && Number(value) > 0)
      .withMessage("Valid eventId is required"),
  ]),
  registrationsController.register
);
router.delete("/:id", registrationsController.cancel);

router.get("/admin/all", requireRole(Role.ADMIN), registrationsController.listAll);
router.get("/admin/stats", requireRole(Role.ADMIN), registrationsController.stats);
router.patch(
  "/:id/status",
  requireRole(Role.ADMIN),
  validate([body("status").notEmpty().withMessage("Status is required")]),
  registrationsController.updateStatus
);

export default router;
