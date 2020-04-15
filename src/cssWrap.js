/*
 * css-wrap
 * https://github.com/benignware/css-wrap
 *
 * @See https://github.com/benignware/grunt-css-wrap
 *
 * Forked and enhanced
 * https://github.com/zanzamar/grunt-css-wrap
 *
 * Copyright (c) 2014 Rafael Nowrotek
 * Licensed under the MIT license.
 *
 * Copyright (c) 2014 Zanzamar
 *
 */
const path = require('path');
const fs = require('fs-extra');
const deepmerge = require('deepmerge');
const cssParse = require('css-parse');
const cssStringify = require('css-stringify');
const chalk = require('chalk');
const log = require('fancy-log');

const processRules = (list, options) => list.map((r) => {
  if (r.selectors) {
    r.selectors.forEach((s, index) => {
      if (options.skip && options.skip.test(s)) return;
      let selector = options.selector
      if (typeof selector === 'string') {
        selector = options.selector ? `${options.selector} ${s}` : s;
      } else {
        let arr = []
        options.selector.forEach(e => {
          arr.push(`${e} ${s}`)
        })
        selector = arr.join(', ')
      }
      r.selectors[index] = selector;
    });
  }
  if (r.type === 'media') {
    r.rules = processRules(r.rules, options);
  }
  return r;
});
const cssWrap = (string, options = {}, filePath = ' ') => {
  const _options = deepmerge({
    selector: '.css-wrap',
    skip: null,
    log: true,
  }, options);
  if (fs.existsSync(path.resolve(string))) {
    try {
      string = fs.readFileSync(string).toString();
    } catch (error) {
      if (log) {
        const fileName = path.basename(filePath);
        log(`${chalk.yellow('css-wrap: skipping empty file ->')} ${fileName}\n`);
      }
      return '';
    }
  }
  const css = cssParse(string);
  css.stylesheet.rules = processRules(css.stylesheet.rules, _options);
  return cssStringify(css);
};


module.exports = cssWrap;
