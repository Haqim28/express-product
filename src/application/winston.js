import './dotenv.js'; // Load environment variables
import winston, { format } from 'winston';
import moment from 'moment';
import path from 'path';

const customFormat = format.printf(({ timestamp, level, message }) => {
  message = typeof message !== 'string' ? JSON.stringify(message) : message;

  return `[${timestamp}] ${process.env.APP_ENV}.${level.toUpperCase()}: ${message}`;
});

const fileTransports = ['error', 'info', 'debug'].map(
  (level) =>
    new winston.transports.File({
      level,
      filename: path.resolve(
        __dirname,
        `../../storage/logs/${moment().format('YYYY-MM-DD')}.${level}.log`,
      ),
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        customFormat,
      ),
    }),
);

const logger = winston.createLogger({
  level: process.env.APP_ENV !== 'production' ? 'debug' : 'info',
  transports: [
    ...fileTransports,
    new winston.transports.Console({
      format: format.combine(
        format.printf((info) => {
          if (process.env.APP_ENV !== 'production') {
            const chalk = require('chalk');
            const message =
              typeof info.message !== 'string'
                ? JSON.stringify(info.message, null, 2)
                : info.message;
            const customLevelFormat = `[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${info.level}`;

            switch (info.level) {
              case 'error':
                info.level = chalk.red(customLevelFormat);
                info.message = chalk.red(message);
                break;
              case 'info':
                info.level = chalk.green(customLevelFormat);
                info.message = chalk.green(message);
                break;
              case 'warn':
                info.level = chalk.yellow(customLevelFormat);
                info.message = chalk.yellow(message);
                break;
              case 'verbose':
              case 'debug':
                info.level = chalk.gray(customLevelFormat);
                info.message = chalk.gray(message);
                break;
              default:
                info.level = chalk.white(customLevelFormat);
                info.message = chalk.white(message);
                break;
            }
          }
        }),
        format.simple(),
      ),
    }),
  ],
});

export default logger;
