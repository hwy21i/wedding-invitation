import fs from "fs/promises";
import path from "path";

export async function ensureFile(filePath) {
  const dir = path.dirname(filePath);
  await fs.mkdir(dir, { recursive: true });

  try {
    await fs.access(filePath);
  } catch {
    await fs.writeFile(filePath, "[]", "utf8");
  }
}

export async function readCollection(filePath) {
  await ensureFile(filePath);
  const raw = await fs.readFile(filePath, "utf8");

  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function writeCollection(filePath, data) {
  await ensureFile(filePath);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
}
