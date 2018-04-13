'use strict';

const generators = require('generator-node');

const Generator = require(generators.eslint);

const prototype = Generator.prototype;

const origin = prototype.initializing;

Generator.prototype.initializing = function() {
  this.sourceRoot(generators.eslint.replace('index.js', 'templates'));
  if (origin) {
    origin.apply(this);
  }
};

module.exports = Generator;
