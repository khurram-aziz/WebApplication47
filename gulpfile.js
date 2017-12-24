/// <binding BeforeBuild='default' />
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
    gUtil.log(production ? 'NODE_ENV is production' : 'NODE_ENV is not production');
    gulp.start('vue-task');
});

gulp.task('vue-task', function () {
    const vueVendors = ['vue', 'vue-router', 'vuetify'];

    gulp.src(['./node_modules/vue/dist/vue.js'      //we dont need this as it will become part of vendor bundle
                                                    //but copying it for some initial demo pages
                                                    //we are also no longer shimming it
        /*'./node_modules/vuetify/dist/vuetify.js'*/])
        .pipe(gulp.dest('./Scripts/'));
    gulp.src(['./node_modules/vuetify/dist/vuetify.css', './node_modules/vuetify/dist/vuetify.css.map'])
        .pipe(gulp.dest('./Content/'));

    //hello-module
    browserify('./Vue/hello-module.js', { debug: !production })
        .transform(babelify)
        .bundle()
        .pipe(fs.createWriteStream('./Scripts/hello-module.js'));

    var b = browserify({ debug: !production });
    vueVendors.forEach(lib => { b.require(lib); });
    b.bundle()
        .pipe(fs.createWriteStream('./Scripts/vue-bundle.js'));

    var vueFiles = [{ folder: './Vue/', file: 'hello-vue-component.js' },
        { folder: './Vue/', file: 'hello-router.js' },
        { folder: './Validation/', file: 'vee-validate.js' },
        { folder: './Vue/', file: 'hello-vuetify.js' }];
    vueFiles.forEach(e => {
        browserify(e.folder + e.file, { debug: !production })
            .external(vueVendors)
            .transform(vueify)
            .transform(babelify)
            .transform(browserifyShim) //https://github.com/vuejs/vueify/issues/122, https://github.com/vuejs/vueify/issues/194
            .bundle()
            .pipe(fs.createWriteStream('./Scripts/' + e.file));
    });
});