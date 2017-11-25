/// <binding BeforeBuild='copy-files' />
/*
This file is the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. https://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp');
var gUtil = require('gulp-util');
var browserify = require('browserify');
var babelify = require('babelify');
var vueify = require('vueify')
var browserifyShim = require('browserify-shim');
var fs = require('fs');

//!gulp.env.productio
var production = (process.env.NODE_ENV === 'production');

gulp.task('default', function () {
    // place code for your default task here
});

gulp.task('copy-files', function () {
    gUtil.log(production ? 'NODE_ENV is production' : 'NODE_ENV is not production');

    //vue
    gulp.src(['./bower_components/vue/dist/vue.js'])
        .pipe(gulp.dest('./Scripts/'));

    //hello-module
    browserify('./Vue/hello-module.js', { debug: !production })
        .transform(babelify)
        .bundle()
        .pipe(fs.createWriteStream('./Scripts/hello-module.js'));
    //hello-vue-component
    browserify('./Vue/hello-vue-component.js', { debug: !production })
        .transform(vueify)
        .transform(babelify)
        .transform(browserifyShim) //https://github.com/vuejs/vueify/issues/122, https://github.com/vuejs/vueify/issues/194
        //.external('vue')
        .bundle()
        .pipe(fs.createWriteStream('./Scripts/hello-vue-component.js'));
    //hello-router
    browserify('./Vue/hello-router.js', { debug: !production })
        .transform(vueify)
        .transform(babelify)
        .transform(browserifyShim)
        //.external('vue')
        .bundle()
        .pipe(fs.createWriteStream('./Scripts/hello-router.js'));
    //vee-validate
    browserify('./Validation/vee-validate.js', { debug: !production })
        .transform(vueify)
        .transform(babelify)
        .transform(browserifyShim)
        .bundle()
        .pipe(fs.createWriteStream('./Scripts/vee-validate.js'));
});