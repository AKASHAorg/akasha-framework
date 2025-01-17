// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const baseConfig = require('../webpack.config');

module.exports = Object.assign(baseConfig, {
  context: path.resolve(__dirname),
  output: Object.assign(baseConfig.output, {
    publicPath: 'auto',
    path: path.resolve(__dirname, '../../dist/libs/app-loader'),
  }),
});
