# gulp-css-wrap

一个 gulp css 压缩插件, 结合 [css-wrap](https://github.com/benignware/css-wrap) 和 [gulp-css-wrap](https://github.com/atskimura/gulp-css-wrap), 修正空文件错误, 调整依赖包.

## 安装

`yarn add @feq/gulp-css-wrap -D`

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

## 配置

`cssWrap(pluginOptions?: object)`

* pluginOptions
  * selector?: string, 符合 css 选择器格式的命名空间, 默认为 `.css-wrap`
  * skip?: string, 需要跳过的 `css` 选择器, 默认为 `null`
  * log?: boolean, 是否显示日志, 默认为 `false`