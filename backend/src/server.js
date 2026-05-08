import app from "./app.js";
import { env } from "./config/env.js";
import { ensureFile } from "./utils/fileDb.js";
import cors from "cors";
import express from "express";
const PORT = process.env.PORT || 5000;




const app = express();

app.use(cors());
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
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
