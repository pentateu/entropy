module.exports = {
  namespace: "prod",
  logger: true,
  logLevel: "debug",

  cacher: "redis://redis",
  transporter: "nats://nats:4222",
  requestTimeout: 5 * 1000,

  circuitBreaker: {
    enabled: true
  },

  metrics: true
};
