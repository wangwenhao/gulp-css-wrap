# gulp-css-wrap

一个 gulp css 压缩插件, 结合 [css-wrap](https://github.com/benignware/css-wrap) 和 [gulp-css-wrap](https://github.com/atskimura/gulp-css-wrap), 修正空文件错误, 调整依赖包.

增加了多个selector合并的支持

## 安装

`yarn add @wwh/gulp-css-wrap -D`

## 示例

```javascript
const gulp = require('gulp');
const rename = require('gulp-rename');
const cssWrap = require('@feq/gulp-css-wrap');

gulp.task('default', async () => {
  await gulp.src('demo/test.css')
    .pipe(cssWrap({
      selector: '.my-app',
      skip: null,
      log: true,
    }))
    .pipe(rename({ suffix: '.scope' }))
    .pipe(gulp.dest('demo/'));
});
```

```javascript
const gulp = require('gulp');
const rename = require('gulp-rename');
const cssWrap = require('@feq/gulp-css-wrap');

gulp.task('default', async () => {
  await gulp.src('demo/test.css')
    .pipe(cssWrap({
      selector: ['.my-app', '.your-app'],
      skip: null,
      log: true,
    }))
    .pipe(rename({ suffix: '.scope' }))
    .pipe(gulp.dest('demo/'));
});
```

## 配置

`cssWrap(pluginOptions?: object)`

* pluginOptions
  * selector?: string | array, 符合 css 选择器格式的命名空间, 默认为 `.css-wrap`
  * skip?: RegExp, 需要跳过的 `css` 选择器正则表达式, 默认为 `null`
  * log?: boolean, 是否显示日志, 默认为 `false`