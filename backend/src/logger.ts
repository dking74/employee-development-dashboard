import winston, { createLogger } from 'winston';
// @ts-ignore
import PaperTrail from 'winston-papertrail';

const transport = (!process.env.DEPLOYED_ENV || process.env.DEPLOYED_ENV === 'development')
  ? new winston.transports.Console({
      level: 'debug',
    })
  : new PaperTrail({
      host: process.env.LOGGER_HOST,
      port: process.env.LOGGER_PORT,
      level: 'debug',
      logFormat: function(level: string, message: string) {
        return '[' + level + '] ' + message;
      }
  });
transport.on('connect', function(message: string) {
  logger && logger.info(message);
});
transport.on('error', function(err: string) {
  logger && logger.error(err);
});

const logger = createLogger({
  format: winston.format.json(),
  levels: {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3
  },
  transports: transport
});

export default logger;