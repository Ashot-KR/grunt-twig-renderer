/*
 * twig-renderer
 *
 *
 * Copyright (c) 2016 Dmitriy Poluektov
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  // load all npm grunt tasks
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    twigRenderer: {
      basic: {
        options: {
          data: 'test/fixtures/data.json'
        },
        files: {
          'tmp/json.html': ['test/fixtures/test.twig']
        }
      },
      yaml: {
        options: {
          data: 'test/fixtures/data.yml'
        },
        files: {
          'tmp/yml.html': ['test/fixtures/test.twig']
        }
      },
      noBeautify: {
        options: {
          data: 'test/fixtures/data.json',
          beautify: false
        },
        files: {
          'tmp/no-beautify.html': ['test/fixtures/test.twig']
        }
      },
      dataFunction: {
        options: {
          data: function(file) {
            if (/-yaml/.test(file)) {
              return 'test/fixtures/data.yml';
            } else {
              return 'test/fixtures/data.json';
            }
          }
        },
        expand: true,
        cwd: "test/fixtures",
        ext: ".html",
        src: ['**/*.twig', '!test.twig'],
        dest: 'tmp/'
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'twigRenderer', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
