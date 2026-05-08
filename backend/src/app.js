import cors from "cors";
import express from "express";
import { env } from "./config/env.js";
import guestRoutes from "./routes/guestRoutes.js";

const app = express();

app.use(
  cors({
    origin: env.clientOrigin,
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
