var gulp = require('gulp');

// Attach plugins and config to gulp object, simply to have it globally
// accessible

gulp.plugin = require('gulp-load-plugins')();
gulp.cfg = require('./blender.json');

var is_prod = gulp.plugin.util.env.prod;
var prod_dir = gulp.cfg.env.production.dir;
var dev_dir = gulp.cfg.env.development.dir;

gulp.cfg.env.dir = is_prod ? prod_dir : dev_dir;

var loadTasks = require('gulp-load')(gulp);
loadTasks(__dirname);
