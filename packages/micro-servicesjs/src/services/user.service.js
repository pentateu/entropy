const KafkaMixin = require("./kafka.mixin.js");

module.exports = {
  mixins: [KafkaMixin],
  name: "user",
  topic: `${this.name}.service`,

  events: {
    "user.kafka.connected": async () => {
      this.logger.debug(`user event:user.kafka.connected ...`);

      this.createProducer();
      await this.createTopics([this.topic]);
      this.createConsumers();
    }
  },

  actions: {
    //store the event
    async signUpRequested(ctx) {
      this.logger.debug(
        `[user signUpRequested()] params: ${JSON.stringify(ctx.params)}`
      );
      return this.storeKafkaEvent("signUpRequested", ctx.params);
    }
  },

  methods: {
    async createTopics(topics) {
      await kafkaSendcreateTopics(topics, (error, result) => {
        const errorMsg = `[${
          this.name
        } createTopics()] Errors creating topics: `;
        if (result && result.length > 0) {
          return this.logger.error(errorMsg, result);
        }
        if (error) {
          return this.logger.error(errorMsg, error);
        }
        this.logger.info(
          `[${this.name} createTopics()] - Kafka topics created!`
        );
      });
    },

    // Maps the event types (signUpRequested, signUpRequestAccepted, signUpRequestRejected ...)
    // to the methods that will handle them.
    // passes down a stream that is already filtered (by key to the fine grained event) and mapped to the actual value.
    setupStream(stream) {
      this.logger.debug(`[user createConsumers()] ...`);

      //const stream = this.kafkaStreamsFactory.getKStream(this.topic);
      stream
        .filter(({ key }) => key === "signUpRequested")
        .map(({ value }) => value)
        .observe(this.onSignUpRequested);
    },

    async validateSignUpRequest(ctx, params) {
      this.logger.debug(
        `[user validateSignUpRequest()] params: ${JSON.stringify(params)}`
      );
      return null;
    },

    async newUserAccount(params) {
      this.logger.debug(
        `user newUserAccount() params: ${JSON.stringify(params)}`
      );
      //TODO save user data
      return param;
    },

    async onSignUpRequested(params) {
      this.logger.debug(
        `user onSignUpRequested() params: ${JSON.stringify(params)}`
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
