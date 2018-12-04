const fbLogger = require('./../index');

let conf = {
    "NODE_ENV": "DEV",
    "NODE_LOG_LEVEL": "info",
    "NODE_LOG_FORMAT": "JSON",
};

let logger = new fbLogger
  .logger(conf)
  .setLogger();

logger.log({level:'info', message:'info', stack:{
        "args": [],
        "func": "bar",
        "line": 32,
        "column": 15,
        "context": {},
        "url": "../test-client.html"
    }});
logger.log({level:'info', message:'info'});
logger.log({level:'error', message:'critical'});
