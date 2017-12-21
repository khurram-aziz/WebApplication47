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

var production = (process.env.NODE_ENV === 'production'); //gulp.env.production
const vendors = ['angular', 'angular-animate', 'angular-aria', 'angular-material'];

gulp.task('default', function () {
    gUtil.log(production ? 'NODE_ENV is production' : 'NODE_ENV is not production');

    gulp.src(['./node_modules/angular/angular.js'])
        .pipe(gulp.dest('./Scripts/'));
    gulp.src(['./node_modules/angular-material/angular-material.css'])
        .pipe(gulp.dest('./Content'));

    var b = browserify({ debug: true });
    vendors.forEach(lib => { b.require(lib); });
    b.bundle()
        .pipe(fs.createWriteStream("./Scripts/angular-material.js"));

    browserify('./AngularJs/boot.js', { debug: !production })
        .external(vendors)
        .transform([babelify])
        .transform(browserifyShim)
        .bundle()
        .pipe(fs.createWriteStream("./Scripts/material-app.js"));
});