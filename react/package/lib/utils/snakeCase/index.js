"use strict";

exports.__esModule = true;
exports.snakeCase = snakeCase;

function snakeCase(word) {
  return "" + word.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}