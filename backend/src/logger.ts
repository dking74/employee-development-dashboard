import winston, { createLogger } from 'winston';

const transport = new winston.transports.Console({
  level: 'debug',
  format: winston.format.simple()
})
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