const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.dev.config');
const webpackServerConfig = require('./serverConfig');
const path = require('path');

const client = path.resolve(__dirname, '../src');

const server = new WebpackDevServer(webpack(config), {
  hot: true,
  host: '127.0.0.1',
  compress: true,
  historyApiFallback: {
    index: '/',
    disableDotRule: true,
  },
  publicPath: config.output.publicPath,
  contentBase: config.output.path,
  disableHostCheck: true,
  watchOptions: {
    ignored: /node_modules/,
  },
  stats: {
    modules: false,
    colors: true,
    chunks: false
  },
});

server.app.get('*', (req, res) => {
  res.sendFile(`${client}/index.html`);
});

server.listen(webpackServerConfig.port, function (err) {
  if (err) {
    console.log(err);
    return;
  }
});