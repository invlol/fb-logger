module.exports = {
  NODE_ENV: process.env.NODE_ENV || "DEV",
  NODE_LOG_LEVEL: process.env.NODE_LOG_LEVEL || 'info',
  NODE_LOG_FORMAT: process.env.NODE_LOG_FORMAT || 'JSON',
  NODE_LOG_SILENT: process.env.NODE_LOG_SILENT || false,
};
