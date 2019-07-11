"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _index = _interopRequireDefault(require("../index.vue"));

var _exampleBadgeDefault = _interopRequireDefault(require("./example-badge-default.vue"));

var _exampleBadgeRound = _interopRequireDefault(require("./example-badge-round.vue"));

var _default = {
  Badge: _index.default,
  BadgeDefault: _exampleBadgeDefault.default,
  BadgeRound: _exampleBadgeRound.default
};
exports.default = _default;