const KafkaMixin = require("./kafka.mixin.js");

module.exports = {
  mixins: [KafkaMixin],
  name: "user",
  topic: `${this.name}.service`,

  events: {
    // "user.kafka.connected": async () => {
    //   this.logger.debug(`user event:user.kafka.connected ...`);
    //   this.createProducer();
    //   await this.createTopics([this.topic]);
    //   this.createConsumers();
    // }
  },

  actions: {
    //store the event
    async signUpRequested(ctx) {
      this.logger.debug(
        `[user action signUpRequested()] params: ${JSON.stringify(ctx.params)}`
      );
      return await this.storeKafkaEvent("signUpRequested", ctx.params);
    }
  },

  methods: {
    // Maps the event types (signUpRequested, signUpRequestAccepted, signUpRequestRejected ...)
    // to the methods that will handle them.
    // passes down a stream that is already filtered (by key to the fine grained event) and mapped to the actual value.
    setupStream() {
      this.logger.debug(`[user setupStream()] - Start`);

      const debugStep = msg => item => {
        this.logger.debug(msg, item);
        return item;
      };

      let stream = this.kafkaStreamsFactory.getKStream().from(this.topic);
      stream
        .mapJSONConvenience()
        .map(debugStep(`signUpRequested stream -> BEFORE map item: `))
        .filter(({ key }) => key === "signUpRequested")
        .map(debugStep(`signUpRequested stream -> AFTER map item: `))
        .map(({ value }) => value)
        .forEach(this.onSignUpRequested);
      stream
        .start()
        .catch(error => this.logger.error("stream.start() error:", error));

      stream = this.kafkaStreamsFactory.getKStream().from(this.topic);
      stream
        .mapJSONConvenience()
        .map(debugStep(`signUpRequestAccepted stream -> BEFORE map item: `))
        .filter(({ key }) => key === "signUpRequestAccepted")
        .map(debugStep(`signUpRequestAccepted stream -> AFTER map item: `))
        .map(({ value }) => value)
        .forEach(this.onSignUpRequestAccepted);
      stream
        .start()
        .catch(error => this.logger.error("stream.start() error:", error));
    },

    async validateSignUpRequest(params) {
      this.logger.debug(
        `[user validateSignUpRequest()] params: ${JSON.stringify(params)}`
      );
      return null;
    },

    async newUserAccount(params) {
      this.logger.debug(
        `[user newUserAccount()] params: ${JSON.stringify(params)}`
      );
      //TODO save user data
      return { id: "new-user-id", ...params };
    },

    async onSignUpRequestAccepted(params) {
      this.logger.debug(
        `[user onSignUpRequestAccepted()] params: ${JSON.stringify(params)}`
      );
    },

    async onSignUpRequested(params) {
      this.logger.debug(
        `[user onSignUpRequested()] params: ${JSON.stringify(params)}`
      );
      let errors = await this.validateSignUpRequest(params);
      if (errors) {
        await this.storeKafkaEvent("signUpRequestRejected", errors);
      }
      const userAccount = await this.newUserAccount(params);
      await this.storeKafkaEvent("signUpRequestAccepted", userAccount);
    }
  }
};
