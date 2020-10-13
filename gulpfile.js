const { src, dest, parallel, watch} = require('gulp')

const browserSync   = require('browser-sync').create()
const concat        = require('gulp-concat')
const uglify        = require('gulp-uglify-es').default
const sass          = require('gulp-sass')
const autoprefixer  = require('gulp-autoprefixer')
const cleanсss      = require('gulp-clean-css')

// browser

function browsersync() {
    browserSync.init({
        server: {baseDir: 'public/'},
        notify: false,
        online: false
    })
}

// javascript

function scripts() {
    return src([
        'resource/js/main.js'
    ])
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(dest('public/js/'))
    .pipe(browserSync.stream())
}

// scss

function styles() {
    return src([
        'resource/scss/style.scss'
    ])
    .pipe(sass())
    .pipe(concat('style.min.css'))
    .pipe(autoprefixer({
        overrideBrowserslist : ['last 10 versions'],
        grid:true
    }))
    .pipe(cleanсss( ({
        level: { 1: {specialComments: 0 } },
        //format: 'beautify'
    }) ))
    .pipe(dest('public/css/'))
    .pipe(browserSync.stream())
}

// watching

function startwatch() {
    watch(
        'resource/**/*.scss', styles)
    watch([
        'resource/**/*.js',
        '!public/**/*.min.js',
    ],scripts)
    watch(
        'public/**/*.html'
    ).on('change',browserSync.reload)
}

// tasks

exports.browsersync = browsersync;
exports.scripts     = scripts
exports.styles      = styles

exports.default     = parallel(scripts, styles, browsersync, startwatch)