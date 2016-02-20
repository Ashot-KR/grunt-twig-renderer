# twig-renderer

> Renders twig templates to html files

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install twig-renderer --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('twig-renderer');
```

## The "twigRenderer" task

### Overview
In your project's Gruntfile, add a section named `twigRenderer` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  twigRenderer: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

#### options.data
Type: `String|Function`

Path to json or yaml file contains data for templates.  
If a function is provided, it should return a path to data file.
```js
{
  data: function(tpl) {
    // tpl argument is a path to template
    if (tpl == 'special.twig') {
      return 'special-data.json';
    } else {
      return 'data.json';
    }
  }
}
```

#### options.beautify
Type: `Object|Boolean`

Configuration for beautifier. See [js-beautify](https://github.com/beautify-web/js-beautify) for available options.
`false` value will disable beautifier.

### Usage Examples
```js
grunt.initConfig({
  twigRenderer: {
    options: {
      data: 'data.json',
      beautify: {
        "indent_size": 2,
        "indent_char": " ",
        "indent_with_tabs": false
      }
    },
    files: {
      'dist/index.html': ['views/index.twig']
    }
  },
})
```
  
If multiple sources for one destinations is provided, different files with fixed destination path will be created.  
In following example two files will be created: `dist/dest_index.html` and `dist/dest_second.html`
```js
grunt.initConfig({
  twigRenderer: {
    options: {
      data: 'data.json'
    },
    files: {
      'dist/dest.html': ['views/index.twig', 'views/second.twig']
    }
  },
})
```

## License
Copyright (c) 2016 Dmitriy Poluektov. Licensed under the MIT license.
