var browserify = require('browserify');

var packages = require('./admin/client/packages');
var b = browserify({
	debug: true, // process.env.NODE_ENV !== 'production',
});
packages.forEach(function (i) { b.require(i); });
b.bundle().pipe(process.stdout);
