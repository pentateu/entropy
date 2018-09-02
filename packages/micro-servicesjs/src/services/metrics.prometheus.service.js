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
  },

  startedZ() {
    this.logger.info("starting prometheus service...");
    this.client = require("prom-client");

    if (this.settings.collectDefaultMetrics) {
      this.timer = this.client.collectDefaultMetrics({
        timeout: this.settings.timeout
      });
    }

    try {
      this.createMetrics(this.settings.metrics);
    } catch (error) {
      //when doing service hot reloading this can fail
      this.logger.warn(
        "failed createMetrics .. is ok if this is due to hot reloading - error:",
        error
      );
    }

    this.server.get("/metrics", (req, res) => {
      res.setHeader("Content-Type", this.client.contentType);
      res.end(this.client.register.metrics());
    });

    return this.server.listen(this.settings.port).then(() => {
      this.logger.info(
        `Prometheus collector is listening on port ${
          this.settings.port
        }, metrics exposed on /metrics endpoint`
      );

      this.updateCommonValues();
    });
  }
};
