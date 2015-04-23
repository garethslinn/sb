/**
 * Created by Gareth Slinn April 2015
 */

var gulp = require('gulp');
var sass = require( 'gulp-ruby-sass' );
var path = require( 'path' );
var compass = require( 'gulp-compass' );
var concat = require( 'gulp-concat' );
var uglify = require( 'gulp-uglify' );
var rename = require( 'gulp-rename' );
var jshint = require('gulp-jshint');

var config = {
    scripts: {
        jsVendorSrc: [ 'src/public/js/ext/jquery-1.11.1.min.js' ],
        jsSrc: [ 'src/public/js/base.js' ],
        outputName: 'all.js',
        outputVendorName: 'vendor.js',
        dest: 'dist/js/'
    },
    styles: {
        src: [ 'src/public/scss/base.scss' ]
    }
};
gulp.task('default', function() {
    // No current default tasks
});

gulp.task('compass', function(){
    return gulp
        .src( config.styles.src )
        .pipe( compass({
            project: path.join( __dirname, 'src/public' ),
            sass: 'scss',
            image: 'img',
            css: '../../dist/css/'
        }));
});

gulp.task('scripts:vendor', function() {
    return gulp
        .src( config.scripts.jsVendorSrc )
        .pipe( concat( config.scripts.outputVendorName ) )
        .pipe( gulp.dest( config.scripts.dest ) )
        .pipe( uglify() )
        .pipe( rename( { extname: '.min.js' } ) )
        .pipe( gulp.dest( config.scripts.dest ) );
});

gulp.task('scripts:game', function() {
    return gulp
        .src( config.scripts.jsSrc )
        .pipe( concat( config.scripts.outputName ) )
        .pipe( gulp.dest( config.scripts.dest ) )
        .pipe( uglify() )
        .pipe( rename( { extname: '.min.js' } ) )
        .pipe( gulp.dest( config.scripts.dest ) );
});

gulp.task('lint', function() {
    return gulp.src('src/public/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});