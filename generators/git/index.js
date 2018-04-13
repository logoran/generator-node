'use strict';

const generators = require('generator-node');

const Generator = require(generators.git);

const prototype = Generator.prototype;

const origin = prototype.initializing;

Generator.prototype.initializing = function() {
  this.sourceRoot(generators.git.replace('index.js', 'templates'));
  if (origin) {
    origin.apply(this);
  }
};

module.exports = Generator;
