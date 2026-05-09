import cors from "cors";
import express from "express";
import { env } from "./config/env.js";
import guestRoutes from "./routes/guestRoutes.js";

const app = express();

function originMatchesPattern(origin, pattern) {
  const escapedPattern = pattern
    .replace(/[.+?^${}()|[\]\\]/g, "\\$&")
    .replace(/\*/g, ".*");
  return new RegExp(`^${escapedPattern}$`).test(origin);
}

function isAllowedOrigin(origin) {
  if (!origin) {
    return true;
  }

  if (env.clientOrigins.includes("*") || env.clientOrigins.includes(origin)) {
    return true;
  }

  return env.allowedOriginPatterns.some((pattern) => originMatchesPattern(origin, pattern));
}

app.use(
  cors({
    origin(origin, callback) {
      if (isAllowedOrigin(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error(`CORS blocked request from ${origin}`));
    },
  }),
);
app.use(express.json({ limit: "1mb" }));

app.use("/api", guestRoutes);
app.get("/", (_req, res) => {
  res.json({
    name: "Wedding Invitation API",
    status: "online",
  });
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({
    message: "Something unexpected happened.",
  });
});

export default app;
