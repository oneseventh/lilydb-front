const rewireHotLoader = require("react-app-rewire-hot-loader");

module.exports = {
    webpack: function (config, env) {
      config = rewireHotLoader(config, env);
      config.output.filename = 'static/js/[name].[hash:6].js';
      config.output.chunkFilename = 'static/js/[name].[hash:6].chunk.js';
      return config;
    },
};