const ApiService = require("moleculer-web");
module.exports = {
  name: "gateway",
  mixins: [ApiService],
  settings: {
    routes: [
      {
        path: "/api",

        whitelist: [
          "$node.health",
          // Access any actions in 'graphql' service
          "graphql.*",
          // Access call only the `user' service
          "user.*"
        ]
      }
    ]
  }
};
