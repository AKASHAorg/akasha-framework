const path = require('path');
const baseConfig = require('../../webpack.config');

const config = {
  context: path.resolve(__dirname),
  output: {
    libraryTarget: baseConfig.output.libraryTarget,
    //library: 'ui-plugin-profile',
    path: path.resolve(__dirname, 'dist'),
    filename: 'profile.js',
    publicPath: '/plugins/',
  },
};

module.exports = Object.assign({}, baseConfig, config);
