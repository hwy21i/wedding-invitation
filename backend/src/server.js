import app from "./app.js";
import { env } from "./config/env.js";
import { ensureFile } from "./utils/fileDb.js";
import express from "express";
import cors from "cors";

const app = express();

const PORT = process.env.PORT || 5000;
app.use(cors());
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
app.get("/", (req, res) => {
  res.send("Backend running");
});

async function startServer() {
  await ensureFile(env.dataFile);

  app.listen(env.port, () => {
    console.log(`Wedding invitation backend listening on http://localhost:${env.port}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start server", error);
  process.exit(1);
});
