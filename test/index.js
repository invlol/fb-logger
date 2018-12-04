const fbLogger = require('./../index');

let conf = {
    "NODE_ENV": "DEV",
    "NODE_LOG_LEVEL": "info",
    "NODE_LOG_FORMAT": "JSON",
};

let logger = new fbLogger
  .Logger()
  .getLogger();

logger.log({level:'info', message:'info', stack:{
        "args": [],
        "func": "bar",
        "line": 32,
        "column": 15,
        "context": {},
        "url": "../test-client.html"
    }});

// logger.silent = true;

logger.log({level:'info', message:'info'});
// logger.silent = false;
logger.log({level:'error', message:'critical'});
