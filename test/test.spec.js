const assert = require('assert');
const File = require('vinyl');
const fs = require('fs-extra');
const path = require('path');
const cssWrap = require('../src/index');

describe('gulp-css-wrap', () => {
  describe('css_wrap()', () => {
    it('should wrap CSS rules in a namespace', (done) => {
      const base = path.join(__dirname, 'fixtures');
      const filePath = path.join(base, 'styles.css');
      const inputFile = new File({
        cwd: __dirname,
        base,
        path: filePath,
        contents: fs.readFileSync(filePath),
      });

      const myCssWrap = cssWrap({ selector: '.my-app' });
      myCssWrap.on('data', (file) => {
        const expextedFilePath = path.join(__dirname, 'expect', 'styles.css');
        assert.equal(file.contents.toString(), fs.readFileSync(expextedFilePath).toString().trim());
        done();
      });
      myCssWrap.write(inputFile);
    });
  });
});
