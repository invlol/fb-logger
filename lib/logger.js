'use strict';
const {createLogger, format, transports} = require('winston');
const {combine, timestamp, printf} = format;

class Logger {

    constructor(config) {
        this._node_env = config.NODE_ENV;
        this._node_log_level = config.NODE_LOG_LEVEL;
        this._node_log_format = config.NODE_LOG_FORMAT;

        switch (this._node_log_format) {
            case 'JSON':
                this.format = printf(info => {
                    return this.jsonFormat(info);
                });
                break;
            case 'CUSTOM':
                this.format = printf(info => {
                    return this.customFormat(info);
                });
                break;
            default:
                this.format = printf(info => {
                    return this.plainFormat(info);
                });
                break;
        }
    }

    log() {
        return createLogger({
            level: this._node_log_level,
            transports: [
                new transports.Console(),
            ],
            format: combine(
                timestamp(),
                format.splat(),
                format.simple(),
                this.format,
            ),
        });
    }

    jsonFormat({level, message, timestamp, ...argv}) {
        return JSON.stringify({
            level,
            message,
            timestamp,
            ...argv || ''
        });
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