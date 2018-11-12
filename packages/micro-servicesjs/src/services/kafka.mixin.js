const { KafkaStreams } = require("kafka-streams");

const producerDefaultOptions = {
  // Configuration for when to consider a message as acknowledged, default 1
  requireAcks: 1,
  // The amount of time in milliseconds to wait for all acks before considered, default 100ms
  ackTimeoutMs: 100,
  // Partitioner type (default = 0, random = 1, cyclic = 2, keyed = 3, custom = 4), default 0
  partitionerType: 2
};

module.exports = {
  settings: {
    kafka: {
      zookeeperHost: "http://kafka.prod.docker.localhost:2181",

      producerReadyTimeout: 3000, //3 seconds

      brokerOptions: {
        "metadata.broker.list": "localhost:9092", //native client requires broker hosts to connect to

        "enable.auto.commit": false,
        "auto.commit.interval.ms": 100,

        event_cb: true,
        "compression.codec": "snappy",
        "api.version.request": true,

        "socket.keepalive.enable": true,
        "socket.blocking.max.ms": 100,

        "heartbeat.interval.ms": 250,
        "retry.backoff.ms": 250,

        "fetch.min.bytes": 100,
        "fetch.message.max.bytes": 2 * 1024 * 1024,
        "queued.min.messages": 100,

        "fetch.error.backoff.ms": 100,
        "queued.max.messages.kbytes": 50,

        "fetch.wait.max.ms": 1000,
        "queue.buffering.max.ms": 1000,

        "batch.num.messages": 10000
      }
    }
  },

  methods: {
    createProducer() {
      this.kafkaProducer = this.newKafkaProducer();
    },

    //Check if producer is ready.. and timeout after a while. see this.settings.kafka.producerReadyTimeout
    async kafkaProducerIsReady() {
      const { producerReadyTimeout } = this.settings.kafka;
      return new Promise((resolve, reject) => {
        const timer = setTimeout(
          () =>
            reject(
              new Error(
                `Timeout waiting for kafka producer to be ready. Timeout in miliseconds: ${producerReadyTimeout}`
              )
            ),
          producerReadyTimeout
        );
        this.kafkaProducer.on("ready", () => {
          clearTimeout(timer);
          resolve();
        });
      });
    },

    newKafkaProducer(options = producerDefaultOptions, customPartitioner) {
      if (!this.settings.kafkaConnected) {
        const msg =
          "Cannot create a Kafka producer since the client is not connected.";
        this.logger.error(msg);
        throw new Error(msg);
      }
      const Kafka = require("kafka-node");
      const producer = new Kafka.Producer(
        this.kafkaClient,
        options,
        customPartitioner
      );
      producer.on("error", error => {
        this.logger.error("Kafka Producer error", error.message);
        this.logger.debug(error);
      });
      return producer;
    },

    kafkaNativeConfig() {
      //dont use these settings for production, it will set your broker on fire..
      const batchOptions = {
        batchSize: 5,
        commitEveryNBatch: 1,
        concurrency: 1,
        commitSync: false,
        noBatchCommits: false
      };

      const nativeConfig = {
        noptions: {
          "group.id": `${this.name}.service-group`,
          "client.id": `${this.name}.service-client`,
          ...this.settings.kafka.brokerOptions
        },
        tconf: {
          "auto.offset.reset": "earliest",
          "request.required.acks": 1
        },
        batchOptions
      };
      return nativeConfig;
    },

    async connectKakfaStreams() {
      this.logger.info(
        `[${
          this.name
        } kafka mixin onnectKakfaStreams()] Connecting to Kafka ...`
      );
      this.kafkaStreamsFactory = new KafkaStreams(this.kafkaNativeConfig());
      this.setupStream();
      this.writeStream = this.kafkaStreamsFactory.getKStream();
      this.writeStream.to(this.topic);
      try {
        await this.writeStream.start();
      } catch (error) {
        //temp try/catch to denbug error
        this.logger.error(
          `[${
            this.name
          } kafka mixin onnectKakfaStreams()] Error on this.writeStream.start() -> Error:`,
          error
        );
      }
      this.logger.info(`[${this.name} kafka mixin onnectKakfaStreams()] Done!`);
    },

    //to be implemented by the service
    setupStream() {},

    async connectKafkaClient() {
      this.logger.info(
        `[${this.name} kafka mixin connectKafka()] Connecting to Kafka ...`
      );

      return new Promise((resolve, reject) => {
        const kafkaLogging = require("kafka-node/logging");
        kafkaLogging.setLoggerProvider(this.logger);

        const Kafka = require("kafka-node");
        this.kafkaClient = new Kafka.Client(
          this.settings.kafka.zookeeperHost,
          `${this.name}.service-zclient`, // zclient == zookeeper client. usint he legacy driver.
          this.settings.kafka.zkOptions,
          this.settings.kafka.noAckBatchOptions,
          this.settings.kafka.sslOptions
        );
        this.kafkaClient.once("connect", () => {
          this.broker.emit(`${this.name}.kafka.connected`);
          this.settings.kafkaConnected = true;
          resolve();
        });

        this.kafkaClient.on("error", error => {
          this.logger.error("Kafka Client error", error.message);
          this.logger.debug(error);
        });
      });
    },

    storeKafkaEvent(key, value) {
      this.logger.debug(
        `[${
          this.name
        } kafka mixin storeKafkaEvent()] key: ${key} value: ${JSON.stringify(
          value
        )}`
      );
      this.writeStream.writeToStream({
        key,
        value: { eventCreated: Date.now(), ...value }
      });
    }
  },

  async started() {
    this.logger.debug(`[${this.name} kafka mixin started()] called!`);
    await this.connectKakfaStreams();
    this.logger.info(`[${this.name} started()] - Done.`);
  }
};
