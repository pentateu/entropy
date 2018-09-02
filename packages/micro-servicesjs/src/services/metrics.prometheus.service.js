const PromService = require("moleculer-prometheus");
const port = process.env.PROMETHEUS_PORT;

module.exports = {
  mixins: [PromService],

  settings: {
    port,
    collectDefaultMetrics: true,
    timeout: 5 * 1000
  },

  actions: {
    health(ctx) {
      return { name: this.name };
    }
  }
};
