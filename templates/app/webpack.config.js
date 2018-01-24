const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
const ENV = process.env.npm_lifecycle_event;
const isTest = ENV === 'test';
const isProd = ENV === 'build';

/**
 * Add `module` property in Webpack configuration.
 *
 * @param {Object} webpackConfig Webpack configuration object
 * @return {Object} Webpack configuration
 */
function addModuleConfig(webpackConfig) {
  return {
    ...webpackConfig,
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                includePaths: [path.resolve(__dirname, 'src/scss')],
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          loader: 'file-loader?name=[name].[ext]',
        },
      ],
    },
  };
}

/**
 * Add production plugins in Webpack configuration.
 *
 * @param {Object} webpackConfig Webpack configuration object
 * @return {Object} Webpack configuration
 */
function addProdPlugins(webpackConfig) {
  return {
    ...webpackConfig,
    plugins: [
      ...webpackConfig.plugins,
      // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
      // Only emit files when there are no errors
      new webpack.NoEmitOnErrorsPlugin(),

      // Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
      // Minify all javascript, switch loaders to minimizing mode
      new webpack.optimize.UglifyJsPlugin(),

      // Copy assets from the public folder
      // Reference: https://github.com/kevlened/copy-webpack-plugin
      new CopyWebpackPlugin([
        {
          from: __dirname + '/src/public',
        },
      ]),
    ],
  };
}

module.exports = (function makeWebpackConfig() {
  let config = {};

  /**
   * Entry
   * Reference: http://webpack.github.io/docs/configuration.html#entry
   * Should be an empty object if it's generating a test build
   * Karma will set this when it's a test build
   */
  config.entry = './src/js/main.js';

  /**
   * Output
   * Reference: http://webpack.github.io/docs/configuration.html#output
   * Should be an empty object if it's generating a test build
   * Karma will handle setting it up for you when it's a test build
   */
  config.output = {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  };

  config = addModuleConfig(config);

  /**
   * Plugins
   * Reference: http://webpack.github.io/docs/configuration.html#plugins
   * List: http://webpack.github.io/docs/list-of-plugins.html
   */
  config.plugins = [];

  // Skip rendering index.html in test mode
  if (!isTest) {
    // Reference: https://github.com/ampedandwired/html-webpack-plugin
    // Render index.html
    config.plugins.push(
      // Reference: https://github.com/ampedandwired/html-webpack-plugin
      // Render index.html
      new HtmlWebpackPlugin({
        template: __dirname + '/src/index.ejs',
      }),
      // Reference: https://github.com/webpack/extract-text-webpack-plugin
      // Extract css files
      // Disabled when in test mode or not in build mode
      new ExtractTextPlugin('[name].[hash].css', { disable: !isProd }),
    );
  }

  // Add build specific plugins
  if (isProd) {
    config = addProdPlugins(config);
  }

  /**
   * Dev server configuration
   * Reference: http://webpack.github.io/docs/configuration.html#devserver
   * Reference: http://webpack.github.io/docs/webpack-dev-server.html
   */
  config.devServer = {
    contentBase: './src/public',
    stats: 'minimal',
  };

  return config;
})();
