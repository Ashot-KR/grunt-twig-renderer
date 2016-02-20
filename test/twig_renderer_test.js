'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.twigRenderer = {
  setUp: function (done) {
    // setup here if necessary
    done();
  },
  basic: function (test) {

    var actual = grunt.file.read('tmp/json.html');
    var expected = grunt.file.read('test/expected/json.html');

    test.ok(grunt.file.exists('tmp/json.html'));
    test.equal(actual, expected, 'should use json data file.');

    test.done();
  },

  yaml: function (test) {

    var actual = grunt.file.read('tmp/yml.html');
    var expected = grunt.file.read('test/expected/yml.html');

    test.equal(actual, expected, 'should use yaml data file.');

    test.done();
  },

  noBeautify: function (test) {

    var actual = grunt.file.read('tmp/no-beautify.html');
    var expected = grunt.file.read('test/expected/no-beautify.html');

    test.equal(actual, expected, 'should not beautify result.');

    test.done();
  },

  dataFunction: function(test) {
    var actualJson = grunt.file.read('tmp/dynamic-json.html');
    var expectedJson = grunt.file.read('test/expected/json.html');

    test.equal(actualJson, expectedJson, 'should use json data file.');

    var actualYaml = grunt.file.read('tmp/dynamic-yaml.html');
    var expectedYaml = grunt.file.read('test/expected/yml.html');

    test.equal(actualYaml, expectedYaml, 'should use yaml data file.');

    test.done();
  }

};
