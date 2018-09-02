const JaegerService = require("moleculer-jaeger");
const Jaeger = require("jaeger-client");
const HTTPSender = require("jaeger-client/dist/src/reporters/http_sender")
  .default;

module.exports = {
  mixins: [JaegerService],
  settings: {
    endpoint: "http://jaeger-collector:14268/api/traces"
  },

  actions: {
    health(ctx) {
      return { name: this.name };
    }
  },

  methods: {
    getReporter() {
      return new Jaeger.RemoteReporter(
        new HTTPSender({ endpoint: this.settings.endpoint })
      );
    }
  }
};
