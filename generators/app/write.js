'use strict';

/**
 * Copy a file or directory.
 *
 * @param {Object} generator Yeoman generator
 * @param {String} filename  Name of the file
 */
function _copy (generator, filename) {
  generator.fs.copyTpl(
    generator.templatePath(filename),
    generator.destinationPath(filename),
    generator.props
  );
}

/**
 * This class manages App Generator writings.
 */
module.exports = {

  /**
   * Write configuration files.
   */
  configFiles () {
    _copy(this, 'webpack.config.js');
  },

  /**
   * Write directories.
   */
  directories () {
    _copy(this, 'scripts');
    _copy(this, 'src');
  }
};
