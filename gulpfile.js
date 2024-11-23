import gulp from 'gulp';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import pug from 'gulp-pug';
import browserSync from 'browser-sync';
import { deleteAsync } from 'del';

// Use dart-sass instead of node-sass
const sass = gulpSass(dartSass);

const bs = browserSync.create();

// Clean dist folder
async function clean() {
    return await deleteAsync(['dist']);
}

// Compile SCSS to CSS with modern API
function styles() {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass.sync({
            outputStyle: 'expanded',
            implementation: dartSass,
            includePaths: ['src/scss']
        }).on('error', sass.logError))
        .pipe(gulp.dest('dist/css'))
        .pipe(bs.stream());
}

// Compile Pug to HTML
function html() {
    return gulp.src('src/pug/pages/*.pug')
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest('dist'))
        .pipe(bs.stream());
}

// Copy JavaScript files
function scripts() {
    return gulp.src('src/js/**/*.js')
        .pipe(gulp.dest('dist/js'))
        .pipe(bs.stream());
}

// Watch files
function watch() {
    bs.init({
        server: {
            baseDir: './dist'
        }
    });

    gulp.watch('src/scss/**/*.scss', styles);
    gulp.watch('src/pug/**/*.pug', html);
    gulp.watch('src/js/**/*.js', scripts);
}

// Define complex tasks
const build = gulp.series(clean, gulp.parallel(styles, html, scripts));
const dev = gulp.series(build, watch);

// Export tasks
export {
    clean,
    build,
    dev
};

export default dev; 