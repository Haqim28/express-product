import './application/dotenv.js';
import app from './application/app.js';

const url = process.env.APP_URL || 'http://localhost';
const port = process.env.APP_PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on ${url}:${port}`);
});
