/// <binding BeforeBuild='default' />
/*
This file is the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. https://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp');
var gUtil = require('gulp-util'); 
var browserify = require('browserify');
var babelify = require('babelify');
var browserifyShim = require('browserify-shim'); 
var fs = require('fs');

var production = (process.env.NODE_ENV === 'production');

gulp.task('default', function () {
    gUtil.log(production ? 'NODE_ENV is production' : 'NODE_ENV is not production'); 

    gulp.src(['./bower_components/react/react.js', './bower_components/react/react-dom.js']) 
        .pipe(gulp.dest('./Scripts/'));

    browserify('./React/clock.js', { debug: !gulp.env.production })
        .transform([babelify, { presets: ['react'] }])
        .transform(browserifyShim)
        .bundle()
        .pipe(fs.createWriteStream("./Scripts/clock.js")); 

    browserify('./React/tictactoe.js', { debug: !gulp.env.production })
        .transform([babelify, { presets: ['react'] }])
        .transform(browserifyShim)
        .bundle()
        .pipe(fs.createWriteStream("./Scripts/tictactoe.js")); 
});