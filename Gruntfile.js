'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        html2js: {
            main: {
                src: ['src/*.html'],
                dest: 'src/templates.js'
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
            all: ['src/*.js', '!src/templates.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        }
    });

    grunt.registerTask('unit', [ 'html2js', 'karma:unit' ]);
    grunt.registerTask('local', [ 'html2js', 'jshint' ]);
    grunt.registerTask('build', [ 'html2js', 'jshint', 'karma:unit' ]);

    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-serve');
    grunt.loadNpmTasks('grunt-contrib-jshint');
};
