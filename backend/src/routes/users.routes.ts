import { Router } from "express";
import { Role } from "@prisma/client";
import * as usersController from "../controllers/users.controller.js";
import { authenticate } from "../middleware/auth.js";
import { requireRole } from "../middleware/authorize.js";

const router = Router();

router.use(authenticate, requireRole(Role.ADMIN));

router.get("/", usersController.list);
router.delete("/:id", usersController.remove);

export default router;
