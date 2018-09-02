const name = "graphql";
module.exports = {
  name,
  actions: {
    health(ctx) {
      return { name };
    },
    query(ctx) {
      return this.query(ctx, ctx.params);
    }
  },

  methods: {
    query(ctx, params) {
      return null;
    }
  }
};
