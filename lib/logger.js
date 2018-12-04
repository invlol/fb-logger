'use strict';
const {createLogger, format, transports} = require('winston');
const {combine, timestamp, printf} = format;
const secrets = require('./config/secrets');

class Logger {

  constructor(config=secrets) {
    this.init(config);
  }

  init({NODE_ENV, NODE_LOG_LEVEL, NODE_LOG_FORMAT}) {
    this._env = NODE_ENV;
    this._level = NODE_LOG_LEVEL;
    this._format = NODE_LOG_FORMAT;
    this.setLogger();
  }

  setLogger() {
    this.logger = createLogger({
      level: this._level,
      transports: [
        new transports.Console(),
      ],
      format: combine(
        timestamp(),
        format.splat(),
        format.simple(),
        this.setFormat(),
      ),
    });
  }

  getLogger() {
    return this.logger;
  }

  setFormat() {
    switch (this._format) {
      case 'JSON':
        return printf(info => {
          return this.jsonFormat(info);
        });
      case 'CUSTOM':
        return printf(info => {
          return this.customFormat(info);
        });
      default:
        return printf(info => {
          return this.plainFormat(info);
        });
    }
  }

  setLevel(level) {
    this._level = level;
  }

  jsonFormat({level, message, timestamp, ...argv}) {
    try {
      return JSON.stringify({
        level,
        message,
        timestamp,
        ...argv || ''
      });
    } catch (e) {
      return this.plainFormat({level, message, timestamp, ...argv});
    }
  };

  plainFormat({level, message, timestamp, ...argv}) {
    return `${timestamp} ${level} > ${message}`;
  };

  customFormat({level, message, timestamp, ...argv}) {
    const extra = JSON.stringify(argv, null, 2);
    const formatted = (extra.length > 2) ? `\n${extra}\n` : '\n';
    switch (level) {
      case 'debug':
        return `\x1b[0m\x1b[34;1m${timestamp} 🐞  ${message}${formatted}\x1b[0m`;
      case 'verbose':
        return `\x1b[0m\x1b[32;1m${timestamp} 💁  ${message}${formatted}\x1b[0m`;
      case 'info':
        return `\x1b[0m\x1b[36m${timestamp} 📣  ${message}${formatted}\x1b[0m`;
      case 'warn':
        return `\x1b[0m\x1b[33m${timestamp} ⚠️  ${message}${formatted}\x1b[0m`;
      case 'error':
        return `\x1b[0m\x1b[31m${timestamp} ☠️  ${message}${formatted}\x1b[0m`;
      default:
        return `\x1b[0m\x1b[0m${itimestamp} > ${message}${formatted}\x1b[0m`;
    }
  }
}

module.exports = Logger;
