/**
 * @author Jim Sangwine
 */

var version = '0.1.1';

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Require dependencies (defined in www/packages.json)
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var autowatch = require('gulp-autowatch');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var jsdoc = require('gulp-jsdoc');
var jasminePhantomJs = require('gulp-jasmine2-phantomjs');
var clean = require('gulp-clean');
var cover = require('gulp-coverage');
var tar = require('gulp-tar');
var gzip = require('gulp-gzip');
var zip = require('gulp-zip');
var connect = require('gulp-connect');
var open = require('gulp-open');

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Setup paths and file lists
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

var paths = {
    in : {
        config: './source/js/GenetixConfig.js',
        js : [
            './source/js/Genetix.js',
            './source/js/Config.js',
            './source/js/Core/*.js',
            './source/js/Objects/*.js',
            './source/js/Organisms/OrganismBase.js',
            './source/js/Organisms/*.js',
            './source/js/Utils/*.js'
        ],
        resources : './source/resources/**/*'
    },
    out : {
        config: 'Genetix-conf.js',
        js : './build/js',
        resources : './build/resources',
        root : './build'
    },
    jasmine : {
        coverage : 'coverage.html',
        reports : {
            in : 'TEST-*.xml',
            out : './test/js/reports'
        },
        specrunner : './test/js/specrunner.html',
        specs : './test/js/specs/**/*.js'
    },
    jsdoc : {
        template : './documentation/jsdoc-lib/jsdoctemplate/docstrap-master/template',
        output : './documentation/output'
    },
    watch : {
        // key = task name to run
        // value = glob or array of globs to watch
        js : [
            './source/js/**/*.js'
        ],
        resources : [
            './source/resources/**/*'
        ]
    },
    preview: {
        path: './test.html',
        url: 'http://localhost:8080/test.html'
    }
};

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Aggregated tasks
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// Default task
gulp.task('default', function(callback) {
    runSequence('full', 'watch', 'preview', callback);
});

// Full build
gulp.task('full', ['test', 'js', 'resources', 'jsdoc']);

// JS build
gulp.task('js', function(callback) {
    runSequence('jshint', 'concat_js', 'minify_js', 'copy_config', 'archive', 'reload', callback);
});

// Unit testing
gulp.task('test', function(callback) {
    runSequence('test_js', 'move_jasmine_reports', 'move_coverage_reports', callback);
});

// Archive
gulp.task('archive', function(callback) {
    runSequence('archive_tar', 'archive_zip', callback);
});

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Server tasks
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

gulp.task('connect', function() {
    return connect.server({
        root: './',
        fallback: 'test.html',
        livereload: true,
        port: 8080
    });
});

gulp.task('reload', function () {
    return gulp.src(paths.preview.path)
        .pipe(connect.reload());
});

gulp.task('preview', function() {
    return gulp.src(paths.preview.path)
        .pipe(open('', { url: paths.preview.url }));
});

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Watch task
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

gulp.task('watch', ['connect'], function(cb) {
    autowatch(gulp, paths.watch);
    return cb();
});

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * JSHint task
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

gulp.task('jshint', function() {
    return gulp.src(paths.in.js)
        .pipe(jshint({ devel: true, evil: true, noarg: true} ))
        .pipe(jshint.reporter('default'));
});

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * JS concatenation task
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

gulp.task('concat_js', function() {
    return gulp.src(paths.in.js)
        .pipe(concat('Genetix.js'))
        .pipe(gulp.dest(paths.out.js));
});

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * JS minification task
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

gulp.task('minify_js', function() {
    // Wrap the operation to allow it to gracefully handle and log errors so as not to disrupt the watch task
    // Has to be redefined in each task in case the pipe was closed by a previous task
    var _uglify = uglify({});
    _uglify.on('error', function(e) {
        gutil.log(e);
        _uglify.end();
    });

    return gulp.src([paths.out.js+'/Genetix.js'])
        .pipe(_uglify)
        .pipe(rename(function (path) {
            path.extname = "-min.js";
        }))
        .pipe(gulp.dest(paths.out.js));
});

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Task for copying config to the build directory
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

gulp.task('copy_config', function() {
    return gulp.src(paths.in.config)
        .pipe(rename(paths.out.config))
        .pipe(gulp.dest(paths.out.js));
});

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * JS documentation task
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

jsdocConf = {
    destination : paths.jsdoc.output,
    template : {
        path : paths.jsdoc.template,
        systemName : 'Genetix',
        copyright : new Date().getFullYear() + ' Jim Sangwine',
        theme : 'spacelab',
        linenums : true,
        collapseSymbols : false,
        outputSourceFiles : true
    },
    infos : {
        name : 'Genetix',
        description : 'A pure JavaScript &amp; Canvas SHMUP engine',
        version : version,
        licenses : ''
    },
    options: {
        'private': true,
        monospaceLinks: false,
        cleverLinks: false,
        outputSourceFiles: true,
        recurse: true
    }
};

gulp.task('jsdoc', function() {
    return gulp.src(paths.in.js)
        .pipe(jsdoc(jsdocConf.destination, jsdocConf.template, jsdocConf.infos, jsdocConf.options))
});

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Jasmine BDD JS unit testing task
 * - don't run directly - use "gulp test" instead
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

gulp.task('test_js', function() {
    return gulp.src(paths.jasmine.specrunner)
        .pipe(cover.instrument({
            pattern: [paths.jasmine.reports.in],
            debugDirectory: 'debug'
        }))
        .pipe(jasminePhantomJs(['--web-security=false', '--load-images=false']))
        .pipe(cover.report({
            outFile: paths.jasmine.coverage
        }));
});

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Task for moving Jasmine reports to the
 * test/js/reports directory
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

gulp.task('move_jasmine_reports', function() {
    return gulp.src(paths.jasmine.reports.in)
        .pipe(clean())
        .pipe(gulp.dest(paths.jasmine.reports.out));
});

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Task for moving test coverage report to the
 * test/js/reports directory
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

gulp.task('move_coverage_reports', function() {
    return gulp.src(paths.jasmine.coverage)
        .pipe(clean())
        .pipe(gulp.dest(paths.jasmine.reports.out));
});

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Task for copying resources to the build directory
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

gulp.task('resources', function() {
    return gulp.src(paths.in.resources)
        .pipe(gulp.dest(paths.out.resources));
});

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Task for creating the TAR archive
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

gulp.task('archive_tar', function () {
    return gulp.src(paths.out.js+'/*.js')
        .pipe(tar('Genetix-'+version+'-min.tar'))
        .pipe(gzip())
        .pipe(gulp.dest(paths.out.root));
});

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Task for creating the ZIP archive
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

gulp.task('archive_zip', function () {
    return gulp.src(paths.out.js+'/*.js')
        .pipe(zip('Genetix-'+version+'-min.zip'))
        .pipe(gulp.dest(paths.out.root));
});
