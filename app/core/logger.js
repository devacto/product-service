var Bunyan = require('bunyan'),
    streams = [{ path: '../../log/out.log' }];

if(process.env.NODE_ENV !== 'test') {
  streams.push({ stream: process.stdout });
}

var log = new Bunyan({
  name: 'CartAPI',
  streams: streams,
  serializers: {
    req: Bunyan.stdSerializers.req,
    res: Bunyan.stdSerializers.res,
  },
});

module.exports = log;
