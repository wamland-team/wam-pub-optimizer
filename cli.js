#!/usr/bin/env node

'use strict';

var meow      = require('meow');
var fs        = require('fs');
var optimizer = require('./');

var cli = meow({
  help: [
    'Usage : pub-optimizer <path_to_optimize> <path_to_optimize>',
    ''
  ].join('\n')
});

var paths = cli.input

paths.forEach(function (path) {
  if (fs.existsSync(path)) {
    optimizer.minify(path);
  } else {
    console.log(path + ' is not a valid directory.')
  }
});
