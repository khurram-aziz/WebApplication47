/// <binding BeforeBuild='default' />
/*
This file is the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. https://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp');
var gUtil = require('gulp-util');
var browserify = require('browserify');
var babelify = require('babelify');
var fs = require('fs');

var production = (process.env.NODE_ENV === 'production');

gulp.task('default', function () {
    gUtil.log(production ? 'NODE_ENV is production' : 'NODE_ENV is not production');

    gulp.src(['./node_modules/angular/angular.js'])
        .pipe(gulp.dest('./Scripts/'));
    gulp.src(['./node_modules/angular-material/angular-material.css'])
        .pipe(gulp.dest('./Content'));

    browserify('./AngularJs/boot.js', { debug: !gulp.env.production })
        .transform([babelify])
        .bundle()
        .pipe(fs.createWriteStream("./Scripts/material.js"));
});