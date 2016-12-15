'use strict';

/**
 * This class manages App Generator writings.
 */
module.exports = {

  /**
   * Write webpack.config.js.
   */
  webpack () {
    this.fs.copyTpl(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js'),
      this.props
    );
  },

  /**
   * Write scripts directory.
   */
  scripts () {
    this.fs.copyTpl(
      this.templatePath('scripts'),
      this.destinationPath('scripts'),
      this.props
    );
  },

  /**
   * Write src directory.
   */
  src () {
    this.fs.copyTpl(
      this.templatePath('src'),
      this.destinationPath('src'),
      this.props
    );
  }

};
