import { Router } from "express";
import * as eventsController from "../controllers/events.controller.js";

const router = Router();

router.get("/", eventsController.list);
router.get("/:id", eventsController.getById);

export default router;
