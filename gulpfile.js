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
var vueify = require('vueify');

var production = (process.env.NODE_ENV === 'production'); //gulp.env.production

gulp.task('default', function () {
    gUtil.log(production ? 'NODE_ENV is production' : 'NODE_ENV is not production');
    gulp.start('angularjs-task');
    gulp.start('react-task');
    gulp.start('vue-task');
});

gulp.task('angularjs-task', function () {
    const vendors = ['angular', 'angular-animate', 'angular-aria', 'angular-material'];

    gulp.src(['./node_modules/angular-material/angular-material.css'])
        .pipe(gulp.dest('./Content'));

    var b = browserify({ debug: !production });
    vendors.forEach(lib => { b.require(lib); });
    b.bundle()
        .pipe(fs.createWriteStream("./Scripts/angularjs-bundle.js"));

    browserify('./AngularJs/boot.js', { debug: !production })
        .external(vendors)
        .transform([babelify])
        //.transform(browserifyShim)
        .bundle()
        .pipe(fs.createWriteStream("./Scripts/material-app.js"));
});

gulp.task('react-task', function () {
    const vendors = ['react', 'react-dom'];

    var b = browserify({ debug: !production });
    vendors.forEach(lib => { b.require(lib); });
    b.bundle()
        .pipe(fs.createWriteStream("./Scripts/react-bundle.js"));

    var reactFiles = [{ folder: './React/', file: 'clock.js' },
        { folder: './React/', file: 'tictactoe.js' }];
    reactFiles.forEach(e => {
        browserify(e.folder + e.file, { debug: !production })
            .transform([babelify, { presets: ['react'] }])
            //.transform(browserifyShim)
            .bundle()
            .pipe(fs.createWriteStream('./Scripts/' + e.file));
    });
});

gulp.task('vue-task', function () {
    const vendors = ['vue', 'vue-router', 'vuetify'];

    gulp.src(['./node_modules/vuetify/dist/vuetify.css', './node_modules/vuetify/dist/vuetify.css.map'])
        .pipe(gulp.dest('./Content/'));

    var b = browserify({ debug: !production });
    vendors.forEach(lib => { b.require(lib); });
    b.bundle()
        .pipe(fs.createWriteStream('./Scripts/vue-bundle.js'));

    var vueFiles = [{ folder: './Vue/', file: 'hello-vue-component.js' },
        { folder: './Vue/', file: 'hello-router.js' },
        { folder: './Validation/', file: 'vee-validate.js' },
        { folder: './Vue/', file: 'hello-vuetify.js' }];
    vueFiles.forEach(e => {
        browserify(e.folder + e.file, { debug: !production })
            .external(vendors)
            .transform(vueify)
            .transform(babelify)
            //.transform(browserifyShim) //https://github.com/vuejs/vueify/issues/122, https://github.com/vuejs/vueify/issues/194
            .bundle()
            .pipe(fs.createWriteStream('./Scripts/' + e.file));
    });
});