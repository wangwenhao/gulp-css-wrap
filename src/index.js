const PluginError = require('plugin-error');
const through = require('through2');
const cssWrap = require('./cssWrap');

const PLUGIN_NAME = 'gulp-css-wrap';

module.exports = (options = {}) => {
  function transform(file, encoding, callback) {
    if (file.isNull()) return callback(null, file);

    if (file.isStream()) {
      return callback(new PluginError(PLUGIN_NAME, 'Streaming not supported'));
    }
    // eslint-disable-next-line
    file.contents = Buffer.from(cssWrap(file.contents.toString(), options, file.path));

    callback(null, file);
  }

  return through.obj(transform);
};
