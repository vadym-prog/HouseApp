import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../data');

/**
 * Ensure data directory exists
 */
export async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch (error) {
    console.error('Failed to create data directory:', error);
  }
}

/**
 * Read data from a JSON file in server/data/
 */
export async function readData(fileName, defaultValue = []) {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, fileName);

  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    if (error.code === 'ENOENT') {
      await writeData(fileName, defaultValue);
      return defaultValue;
    }
    console.error(`Error reading ${fileName}:`, error);
    return defaultValue;
  }
}

/**
 * Write data to a JSON file in server/data/
 */
export async function writeData(fileName, data) {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, fileName);

  try {
    const jsonString = JSON.stringify(data, null, 2);
    await fs.writeFile(filePath, jsonString, 'utf-8');
  } catch (error) {
    console.error(`Error writing ${fileName}:`, error);
    throw error;
  }
}
