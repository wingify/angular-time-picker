'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        html2js: {
            main: {
                src: ['src/*.html'],
                dest: 'src/templates.js'
            },
            options: {
                module:'html2js',
                rename: function (moduleName) {
                    return '/' + moduleName;
                }
            }
        },
        karma: {
            unit: {
                options:{
                    configFile:'karma.conf.js'
                }
            }
        },
        serve: {
            options: {
                port: 9000
            }
        },
        // Linting js files, config settings in .jshintrc
        jshint: {
            all: ['src/*.js', '!src/templates.js', 'test/*.js', 'Gruntfile.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        uglify: {
            js: {
                files: {
                    'dist/angular-time-picker.min.js': ['src/templates.js','src/angular-time-picker.js']
                }
            },
            dev: {
                files: {
                    'dist/angular-time-picker.js': ['src/templates.js','dist/angular-time-picker.js']
                },
                options: {
                    compress: false,
                    mangle: false,
                    beautify: true
                }
            }
        },
        cssmin: {
            css: {
                files: {
                    'dist/angular-time-picker.min.css': ['src/angular-time-picker.css']
                }
            }
        },
        copy: {
            src: {
                files: [{
                    expand: true,
                    src: [ 'angular-time-picker.css', 'angular-time-picker.js' ],
                    cwd: 'src',
                    dest: 'dist/',
                    filter: 'isFile'
                }]
            }
        },
        clean: {
            before: [ 'dist' ]
        }
    });

    grunt.registerTask('local', [ 'html2js', 'jshint' ]);
    grunt.registerTask('minify', [ 'uglify', 'cssmin' ]);
    grunt.registerTask('build', [ 'clean:before', 'html2js', 'jshint', 'copy:src', 'minify' ]);
    grunt.registerTask('unit', [ 'html2js', 'karma:unit' ]);

    require('jit-grunt')(grunt);
};
