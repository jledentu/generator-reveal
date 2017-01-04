'use strict';

const _ = require('underscore.string');
const path = require('path');
const Base = require('yeoman-generator').Base;
const yosay = require('yosay');
const chalk = require('chalk');

const write = require('./write');
const pkg = require('../../package.json');

module.exports = class AppGenerator extends Base {

  /**
   * Constructor.
   */
  constructor (...args) {
    super(...args);

    this.argument('appname', {
      type: String,
      required: false
    });

    this.props = {_};
  }

  /**
   * Initialize this generator.
   */
  get initializing () {
    return {

      /**
       * Get version.
       */
      version () {
        this.version = pkg.version;
      },

      /**
       * Set app name.
       */
      appName () {
        this.props.appname = this.appname || path.basename(process.cwd());
        this.props.appname = _.slugify(_.humanize(this.props.appname));
      },

      /**
       * Define template context.
       */
      paths () {
        this.sourceRoot(path.join(__dirname, '../../templates/app'));
      },

      /**
       * Display a welcome message.
       */
      welcome () {
        this.log(yosay(
          `Welcome to the ${chalk.red('Reveal.js')} generator!`
        ));
      }
    };
  }

  /**
   * Write configuration files.
   */
  configuring () {

    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('_gitignore'),
      this.destinationPath('.gitignore'),
      this.props
    );
  }

  /**
   * Write project files.
   */
  get writing () {
    return write;
  }

  /**
   * Install dependencies.
   */
  install () {
    this.npmInstall();
  }

  /**
   * Say goodbye.
   */
  end () {
  }
};
