const gulp = require(`gulp`);
const browserSync = require(`browser-sync`).create();
const cleanCSS = require(`gulp-clean-css`);
const babel = require(`gulp-babel`);
const uglify = require(`gulp-uglify`);
const htmlmin = require(`gulp-htmlmin`);
const reload = browserSync.reload;

function compressCSS() {
  return gulp.src(`src/css/*.css`)
    .pipe(cleanCSS())
    .pipe(gulp.dest(`dist/css`));
}

function compressJS() {
  return gulp.src(`src/js/*.js`)
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(uglify())
    .pipe(gulp.dest(`dist/js`));
}

function compressHTML() {
  return gulp.src(`src/*.html`)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(`dist`));
}

function sync() {
  browserSync.init({ server: { baseDir: `./dist` } });
  gulp.watch(`dist/js/*.js`).on(`change`, reload);
  gulp.watch(`dist/css/*.css`).on(`change`, reload);
  gulp.watch(`dist/*.html`).on(`change`, reload);
}

exports.default = function () {
  gulp.watch(`src/css/*.css`, compressCSS);
  gulp.watch(`src/js/*.js`, compressJS);
  gulp.watch(`src/*.html`, compressHTML);
  compressCSS();
  compressJS();
  compressHTML();
  sync();
}