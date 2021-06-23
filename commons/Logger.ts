import fs from 'fs';

import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const env = process.env.NODE_ENV || 'development';
const logDir = __dirname + '/log';

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const Logger = createLogger({
  level: env === 'production' ? 'info' : 'debug',
  format: format.combine(
    format.label({ label: `${process.pid}` }),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf((info) => `${info.timestamp} ${info.level}: [${info.label}]: ${info.message}`),
      ),
    }),
    new DailyRotateFile({
      filename: `${logDir}/server-%DATE%.log`,
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxFiles: '30d',
      format: format.combine(
        format.printf((info) => `${info.timestamp} ${info.level}: [${info.label}]: ${info.message}`),
      ),
    }),
    new DailyRotateFile({
      level: 'error',
      filename: `${logDir}/server-%DATE%.error.log`,
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxFiles: '30d',
      format: format.combine(
        format.printf((info) => `${info.timestamp} ${info.level}: [${info.label}]: ${info.message}`),
      ),
    }),
  ],
});

export default Logger;