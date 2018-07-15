const winston = require('winston');

const env = process.env.NODE_ENV || 'development';

const tsFormat = () => (new Date()).toLocaleTimeString();

exports.logger = new (winston.Logger)({
  transports: [
    // colorize the output to the console
    new (winston.transports.Console)({
      timestamp: tsFormat,
      colorize: true,
      level: 'info'
    }),
    new (winston.transports.File)({
      filename: `db-service.log`,
      timestamp: tsFormat,
      level: env === 'development' ? 'debug' : 'info'
    })
  ]
});

