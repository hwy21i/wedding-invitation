import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const backendRoot = path.resolve(__dirname, "..", "..");

export const env = {
  port: Number(process.env.PORT) || 4000,
  clientOrigin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  clientOrigins: (process.env.CLIENT_ORIGIN || "http://localhost:5173")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
  allowedOriginPatterns: (process.env.ALLOWED_ORIGIN_PATTERNS || "https://*.vercel.app")
    .split(",")
    .map((pattern) => pattern.trim())
    .filter(Boolean),
  dataFile: path.resolve(backendRoot, process.env.DATA_FILE || "./data/guests.json"),
};
