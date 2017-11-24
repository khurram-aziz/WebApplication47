/// <binding BeforeBuild='copy-files' />
/*
This file is the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. https://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var vueify = require('vueify')
var fs = require('fs');

//!gulp.env.productio
var production = (process.env.NODE_ENV === 'production');

gulp.task('default', function () {
    // place code for your default task here
});

gulp.task('copy-files', function () {
    //vue
    gulp.src(['./bower_components/vue/dist/vue.js'])
        .pipe(gulp.dest('./Scripts/'));

    //hello-module
    browserify('./Vue/hello-module.js', { debug: !production })
        .transform([babelify, { presets: ['es2015'] }])
        .bundle()
        .pipe(fs.createWriteStream('./Scripts/hello-module.js'));
    //hello-vue-component
    browserify('./Vue/hello-vue-component.js', { debug: !production })
        .transform(vueify)
        .transform([babelify, { presets: ['es2015'] }])
        .bundle()
        .pipe(fs.createWriteStream('./Scripts/hello-vue-component.js'));
    //vee-validate
    browserify('./Validation/vee-validate.js', { debug: !production })
        .transform(vueify)
        .transform([babelify, { presets: ['es2015'] }])
        .bundle()
        .pipe(fs.createWriteStream('./Scripts/vee-validate.js'));
});