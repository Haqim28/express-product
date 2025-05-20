import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Buat __filename dan __dirname di ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load file .env yang ada di dua folder di atas (root project)
dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
});
