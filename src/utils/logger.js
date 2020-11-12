const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
      winston.format.colorize({ level: true }),
      winston.format.simple(),
      winston.format.timestamp({ format: 'YYYY/MM/DD HH:mm:ss' }),
      winston.format.printf(
          (m) => `${m.timestamp} ${m.level} ${m.message}`,
      ),
  ),
  transports: [
    new winston.transports.Console(),
  ],
});

if (process.env.NODE_ENV === 'production') {
  logger.add(new winston.transports.File({ filename: 'application.log' }));
}

module.exports = logger;
