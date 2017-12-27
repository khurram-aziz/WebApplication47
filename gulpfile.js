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

var production = (process.env.NODE_ENV === 'production'); //gulp.env.production

gulp.task('default', function () {
    gUtil.log(production ? 'NODE_ENV is production' : 'NODE_ENV is not production');
    gulp.start('react-task');
});

gulp.task('react-task', function () {
    const vendors = ['react', 'react-dom'];

    var b = browserify({ debug: !production });
    vendors.forEach(lib => { b.require(lib); });
    b.bundle()
        .pipe(fs.createWriteStream("./Scripts/react-bundle.js"));

    var reactFiles = [{ folder: './React/', file: 'clock.js' },
        { folder: './React/', file: 'tictactoe.js' },
        { folder: './React/', file: 'material-ui-app.js' }];
    reactFiles.forEach(e => {
        browserify(e.folder + e.file, { debug: !production })
            .external(vendors)
            .transform([babelify, { presets: ['react'] }])
            //.transform(browserifyShim)
            .bundle()
            .pipe(fs.createWriteStream('./Scripts/' + e.file));
    });
});
