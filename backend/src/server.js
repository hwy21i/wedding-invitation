import app from "./app.js";
import { env } from "./config/env.js";
import { ensureFile } from "./utils/fileDb.js";

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
