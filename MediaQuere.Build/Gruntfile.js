var assetsDir = '../MediaQuere.Web/Assets/';

module.exports = function (grunt) {
	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

	var gruntConfig = {
		pkg: grunt.file.readJSON('package.json'),
		nodemon: {
			all: {
				script: 'gruntfile.js',
				options: {
					watchedExtentions: ['js']
				}
			}
		},
		less: {
			build: {
				options: {
					relativeUrls: true
				},
				files: {}
			}
		},
		concat: {
			build: {
				src: [
					assetsDir + 'JavaScripts/jQuery/jquery.js',
					assetsDir + 'JavaScripts/jQuery/jquery*.js',
					assetsDir + 'JavaScripts/Angular/angular.js',
					assetsDir + 'JavaScripts/Angular/angular-*.js'
				],
				dest: assetsDir + 'JavaScripts/scripts.js'
			}
		},
		ts: {
			options: {
				fast: 'never',
				sourceMap: false
			},
			build: {
				src: [assetsDir + 'TypeScripts/**/*.ts'],
				reference: assetsDir + 'TypeScripts/_references.ts',
				out: assetsDir + 'TypeScripts/typescripts.js'
			}
		},
		watch: {
			javascript: {
				files: [assetsDir + 'JavaScripts/**/*.js'],
				tasks: ['concat:build']
			},
			typescript: {
				files: [assetsDir + 'TypeScripts/**/*.ts'],
				tasks: ['ts:build']
			},
			less: {
				files: assetsDir + 'Styles/**/*.less',
				tasks: ['less:build']
			}
		}
	};

	gruntConfig['less']['build']['files'][assetsDir + 'Styles/responsive.css'] = assetsDir + 'Styles/responsive.less';

	grunt.initConfig(gruntConfig);

	grunt.registerTask('default', ['watch']);
	grunt.registerTask('build', ['concat:build', 'ts:build', 'less:build']);
};