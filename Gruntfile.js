var fs = require('fs');

module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('bower.json'),
		concat: {
			options: {
				stripBanners: {
					'block': true,
					'line': true
				},
				banner: '/*\n<%= pkg.name %> <%= pkg.version %> - <%= pkg.description %> \nCopyright (C) 2014 - <%= pkg.authors %> and contributors \nLicense: <%= pkg.license %> \nSource: <%= pkg.homepage %> \nDate Compiled: <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
			},
			dist: {
				src: ['angular-progressbar.js'],
				dest: 'dist/angular-progressbar.js'
			}
		},
		uglify: {
			options: {
				banner: '/*\n<%= pkg.name %> <%= pkg.version %> - <%= pkg.description %> \nCopyright (C) 2014 - <%= pkg.authors %> and contributors \nLicense: <%= pkg.license %> \nSource: <%= pkg.homepage %> \nDate Compiled: <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n',
				sourceMap: true
			},
			build: {
				src: 'dist/<%= pkg.name %>.js',
				dest: 'dist/<%= pkg.name %>.min.js'
			}
		},
		jshint: {
			options: {
				browser: true
			},
			all: 'src/*.js'
		}
	});

	grunt.registerTask('version', function(file_version){
		var bower = grunt.file.readJSON('bower.json');
		var npm_package = grunt.file.readJSON('package.json');

		bower.version = file_version;
		npm_package.version = file_version;

		fs.writeFileSync('bower.json', JSON.stringify(bower, null, 4));
		fs.writeFileSync('package.json', JSON.stringify(npm_package, null, 4));
	})

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-karma');
	grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
};
