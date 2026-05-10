import cors from "cors";
import express from "express";
import { env } from "./config/env.js";
import guestRoutes from "./routes/guestRoutes.js";

const app = express();

const corsOptions = {
  origin: true,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json({ limit: "1mb" }));

app.use("/api", guestRoutes);
app.use("/", guestRoutes);
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
