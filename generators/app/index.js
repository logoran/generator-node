'use strict';

const _ = require('lodash');
const validatePackageName = require('validate-npm-package-name');
const parseAuthor = require('parse-author');
const generators = require('generator-node');
const nodeGenerator = require(generators.app);

const prototype = nodeGenerator.prototype;

prototype.initializing = function() {
  this.pkg = this.fs.readJSON(this.destinationPath('package.json'), {});

  // Pre set the default props from the information we have at this point
  this.props = Object.assign(
    {
      name: this.pkg.name,
      description: this.pkg.description,
      version: this.pkg.version,
      homepage: this.pkg.homepage,
      repositoryName: this.options.repositoryName
    },
    this.options
  );

  if (this.options.name) {
    const name = this.options.name;
    const packageNameValidity = validatePackageName(name);

    if (packageNameValidity.validForNewPackages) {
      this.props.name = name;
    } else {
      throw new Error(
        packageNameValidity.errors[0] ||
          'The name option is not a valid npm package name.'
      );
    }
  }

  if (_.isObject(this.pkg.author)) {
    this.props.authorName = this.props.authorName || this.pkg.author.name;
    this.props.authorEmail = this.props.authorEmail || this.pkg.author.email;
    this.props.authorUrl = this.props.authorUrl || this.pkg.author.url;
  } else if (_.isString(this.pkg.author)) {
    const info = parseAuthor(this.pkg.author);
    this.props.authorName = this.props.authorName || info.name;
    this.props.authorEmail = this.props.authorEmail || info.email;
    this.props.authorUrl = this.props.authorUrl || info.url;
  }
};

module.exports = nodeGenerator;
