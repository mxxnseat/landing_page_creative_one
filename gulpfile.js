const { src, dest, parallel, watch, series } = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass");
const concat = require("gulp-concat");
const clean_css = require("gulp-clean-css");
const uglify = require("gulp-uglify-es").default;

function listener() {
    browserSync.init({
        server: {
            baseDir: "app/",
            notify: false,
        }
    })
}
function styles() {
    return src("app/sass/style.scss")
        .pipe(sass())
        .pipe(concat("style.min.css"))
        .pipe(clean_css({ level: { 1: { specialComments: 0 } } }))
        .pipe(dest("app/css/"))
        .pipe(browserSync.stream())
}
function scripts() {
    return src(["app/js/jquery.min.js", "app/js/wow.min.js", "app/js/main.js"])
        .pipe(concat("main.min.js"))
        .pipe(uglify())
        .pipe(dest("app/js/"))
        .pipe(browserSync.stream())
}
function startWatch() {
    watch("app/sass/**/*.scss", styles)
    watch(["app/**/*.js", '!app/**/*.min.js'], scripts)
    watch("app/**/*.html").on("change", browserSync.reload)
}
function buildcopy(){
    return src([
    'app/css/**/*.min.css',
    'app/fonts/**/*',
    'app/js/**/*.js','!app/js/main.js', '!app/js/wow.min.js', '!app/js/jquery.min.js',
    'app/img/**/*', 
    'app/**/*.html',], {base: "app"})
    .pipe(dest("dist"))
}

exports.styles = styles;

exports.default = parallel(styles, scripts, listener, startWatch);
exports.build = series(styles, scripts,buildcopy);