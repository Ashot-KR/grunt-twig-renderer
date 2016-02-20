/*
 * twig-renderer
 *
 *
 * Copyright (c) 2016 Dmitriy Poluektov
 * Licensed under the MIT license.
 */

'use strict';

var beautify = require('js-beautify').html;
var chalk = require('chalk');
var Twig = require('twig');
var path = require('path');

module.exports = function (grunt) {

  function readData(filepath, options) {
    var ext = path.parse(filepath).ext;

    options = options || {};

    if (ext === '.yml' || ext === '.yaml') {

      return grunt.file.readYAML(filepath, options);
    } else {
      return grunt.file.readJSON(filepath, options);
    }
  }

  grunt.registerMultiTask('twigRenderer', 'Renders twig templates to html files', function () {

    var options = this.options({
      beautify: {}
    });

    this.files.forEach(function (file) {

      var multipleSrc = file.src.length > 1;

      file.src.forEach(function (filepath) {
        var dest = file.dest,
            dataFile = options.data,
            html,
            parsedDest,
            parsedSrc;

        if (typeof dataFile === 'function') {
          dataFile = dataFile(filepath);
        }

        html = Twig.twig({
          path: filepath,
          async: false
        }).render(readData(dataFile) || {});

        if (options.beautify === true) {
          options.beautify = {};
        }

        if (options.beautify) {
          html = beautify(html, options.beautify);
        }

        if (multipleSrc) {
          parsedDest = path.parse(dest);
          parsedSrc = path.parse(filepath);

          parsedDest.base = parsedDest.name + '_' + parsedSrc.name + parsedDest.ext;

          dest = path.format(parsedDest);
        }

        grunt.file.write(dest, html);

        grunt.log.writeln(chalk.green('✔ ') + chalk.bold(filepath) + ' -> ' + chalk.cyan.bold(dest));

      });

    });

  });

};
