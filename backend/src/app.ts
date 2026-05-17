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
      origin(origin, callback) {
        // Allow non-browser tools (no Origin header) and configured dev origins
        if (!origin) {
          callback(null, true);
          return;
        }
        const allowed = env.corsOrigin;
        const isLocalDev =
          /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
        if (allowed.includes(origin) || (env.nodeEnv !== "production" && isLocalDev)) {
          callback(null, true);
          return;
        }
        callback(null, false);
      },
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
