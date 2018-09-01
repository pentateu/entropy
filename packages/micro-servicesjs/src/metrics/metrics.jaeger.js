const JaegerService = require("moleculer-jaeger");

module.exports = {
  mixins: [JaegerService],
  settings: {
    host: "jaeger-collector",
    port: 14268
  }
};
