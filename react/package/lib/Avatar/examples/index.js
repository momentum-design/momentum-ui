"use strict";

exports.__esModule = true;
exports.AvatarTyping = exports.AvatarStatus = exports.AvatarSelf = exports.AvatarNotification = exports.AvatarKitchenSink = exports.AvatarInactive = exports.AvatarGroup = exports.AvatarFailure = exports.AvatarDefault = exports.AvatarComposite = exports.AvatarBot = exports.AvatarActive = void 0;

var _Active = _interopRequireDefault(require("./Active"));

exports.AvatarActive = _Active.default;

var _Bot = _interopRequireDefault(require("./Bot"));

exports.AvatarBot = _Bot.default;

var _Composite = _interopRequireDefault(require("./Composite"));

exports.AvatarComposite = _Composite.default;

var _Default = _interopRequireDefault(require("./Default"));

exports.AvatarDefault = _Default.default;

var _Failure = _interopRequireDefault(require("./Failure"));

exports.AvatarFailure = _Failure.default;

var _Group = _interopRequireDefault(require("./Group"));

exports.AvatarGroup = _Group.default;

var _Inactive = _interopRequireDefault(require("./Inactive"));

exports.AvatarInactive = _Inactive.default;

var _KitchenSink = _interopRequireDefault(require("./KitchenSink"));

exports.AvatarKitchenSink = _KitchenSink.default;

var _Notification = _interopRequireDefault(require("./Notification"));

exports.AvatarNotification = _Notification.default;

var _Self = _interopRequireDefault(require("./Self"));

exports.AvatarSelf = _Self.default;

var _Status = _interopRequireDefault(require("./Status"));

exports.AvatarStatus = _Status.default;

var _Typing = _interopRequireDefault(require("./Typing"));

exports.AvatarTyping = _Typing.default;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }