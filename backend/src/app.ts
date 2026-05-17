import cors from "cors";
import express from "express";
import { env } from "./config/env.js";
import { errorHandler } from "./middleware/errorHandler.js";
import authRoutes from "./routes/auth.routes.js";
import eventsRoutes from "./routes/events.routes.js";
import registrationsRoutes from "./routes/registrations.routes.js";
import usersRoutes from "./routes/users.routes.js";

export function createApp() {
  const app = express();

  app.use(
    cors({
      origin: env.corsOrigin,
      credentials: true,
    })
  );
  app.use(express.json());

  app.get("/api/health", (_req, res) => {
    res.json({ success: true, status: "ok" });
  });

  app.use("/api/auth", authRoutes);
  app.use("/api/events", eventsRoutes);
  app.use("/api/users", usersRoutes);
  app.use("/api/registrations", registrationsRoutes);

  app.use(errorHandler);

  return app;
}
