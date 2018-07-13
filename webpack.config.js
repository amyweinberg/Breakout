const path = require('path');

module.exports = {
  entry: './javascript/breakout.js',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }
};