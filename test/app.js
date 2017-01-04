'use strict';

const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');

/**
 * Test app generator.
 */
describe('app', () => {

  describe('default settings', () => {
    before(done => {
      this.generator = helpers
        .run(path.join(__dirname, '../generators/app'))
        .toPromise()
        .then(() => done());
    });

    it('should generate package.json file', () => {
      assert.file('package.json');
    });

    it('should generate .gitignore file', () => {
      assert.file('.gitignore');
    });

    it('should generate webpack.config.js file', () => {
      assert.file('webpack.config.js');
    });

    it('should generate print-pdf script file', () => {
      assert.file('scripts/print-pdf.js');
    });

    it('should generate index file', () => {
      assert.file('src/index.ejs');
    });

    it('should generate JavaScript source files', () => {
      assert.file('src/js/main.js');
    });

    it('should generate SASS source files', () => {
      assert.file('src/scss/main.scss');
    });

    it('should generate slides files', () => {
      assert.file('src/public/slides/title.md');
    });
  });

});
