/* eslint-env node */
/* eslint @typescript-eslint/no-var-requires: "off" */

const { configPaths } = require('react-app-rewire-alias');
const aliasMap = configPaths('./tsconfig.paths.json');

module.exports = function override(config) {
  config.resolve.alias = {
    ...aliasMap,
    ...config.resolve.alias,
  };

  return config;
};
