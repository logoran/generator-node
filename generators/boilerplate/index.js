'use strict';

const generators = require('generator-node');

const Generator = require(generators.boilerplate);

const prototype = Generator.prototype;

const origin = prototype.initializing;

Generator.prototype.initializing = function() {
  this.sourceRoot(generators.boilerplate.replace('index.js', 'templates'));
  if (origin) {
    origin.apply(this);
  }
};

module.exports = Generator;
