const Dotenv = require("dotenv-webpack");

module.exports = {
  target: "serverless",
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs, net, tls` module
    if (!isServer) {
      config.node = {
        fs: "empty",
        net: "empty",
        tls: "empty",
        "fs-extra": "empty",
      };
    } else {
      config.plugins.push(new Dotenv({ silent: true }));
    }
    return config;
  },
};
