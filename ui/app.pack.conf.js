module.exports = {
  externals: [
    /^@akashaproject\/design-system$/,
    /^react$/,
    /^react-dom$/,
    /^react-i18next$/,
    /^react-router-dom$/,
    /^immer$/,
    ///^single-spa-react$/,
    /// ^react-tracked$/,
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      minChunks: 10,
      minSize: 328000,
    },
  },
};
