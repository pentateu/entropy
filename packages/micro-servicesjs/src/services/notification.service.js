const KafkaMixin = require("./kafka.mixin.js");

module.exports = {
  mixins: [KafkaMixin],
  name: "notification",
  topic: `${this.name}.service`,

  methods: {
    // Maps the event types (signUpRequestAccepted, signUpRequestRejected)
    // to the methods that will handle them.
    // passes down a stream that is already filtered (by key to the fine grained event) and mapped to the actual value.
    setupStream() {
      this.logger.debug(`[notification setupStream()] - Start`);

      const debugStep = msg => item => {
        this.logger.debug(msg, item);
        return item;
      };

      let stream = this.kafkaStreamsFactory.getKStream().from("user.service");
      stream
        .mapJSONConvenience()
        .filter(({ key }) => key === "signUpRequestAccepted")
        .map(({ value }) => value)
        .forEach(this.onSignUpRequestAccepted);
      stream
        .start()
        .catch(error => this.logger.error("stream.start() error:", error));
    },

    async onSignUpRequestAccepted(params) {
      this.logger.debug(
        `[notification onSignUpRequestAccepted()] params: ${JSON.stringify(
          params
        )}`
      );
    }
  }
};
