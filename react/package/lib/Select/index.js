"use strict";

exports.__esModule = true;
exports.default = void 0;

var _filter = _interopRequireDefault(require("lodash/filter"));

var _find = _interopRequireDefault(require("lodash/find"));

var _isEqual = _interopRequireDefault(require("lodash/isEqual"));

var _omit = _interopRequireDefault(require("lodash/omit"));

var _uniqueId = _interopRequireDefault(require("lodash/uniqueId"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _ = require("./..");

var _SelectContext = _interopRequireDefault(require("../SelectContext"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Select = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(Select, _React$Component);

  function Select() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.state = {
      isOpen: false,
      selected: [],
      selectedIndex: [],
      anchorNode: null,
      anchorWidth: null,
      id: _this.props.id || (0, _uniqueId.default)('md-select-')
    };

    _this.hidePopover = function () {
      _this.setState({
        isOpen: false
      });
    };

    _this.handleSelect = function (e, opts) {
      e.preventDefault();
      var _this$state = _this.state,
          selected = _this$state.selected,
          selectedIndex = _this$state.selectedIndex;
      var isMulti = _this.props.isMulti;
      var value = opts.value,
          label = opts.label,
          eventKey = opts.eventKey;
      var isActive = (0, _find.default)(selected, {
        value: value,
        label: label
      });
      !isMulti && _this.setState({
        isOpen: false
      });
      if (isActive && !isMulti) return;

      if (isActive && isMulti) {
        return _this.setState({
          selected: (0, _filter.default)(selected, function (item) {
            return !(0, _isEqual.default)(item, {
              value: value,
              label: label
            });
          }),
          selectedIndex: selectedIndex.filter(function (i) {
            return i !== eventKey;
          })
        });
      } else if (!isActive && !isMulti) {
        return _this.setState({
          selected: [{
            value: value,
            label: label
          }],
          selectedIndex: [eventKey]
        });
      } else {
        return _this.setState({
          selected: [].concat(selected, [{
            value: value,
            label: label
          }]),
          selectedIndex: [].concat(selectedIndex, [eventKey])
        });
      }
    };

    _this.choosePosition = function () {
      var _this$state2 = _this.state,
          isOpen = _this$state2.isOpen,
          anchorNode = _this$state2.anchorNode;
      isOpen && _this.setAnchorWidth(anchorNode);
    };

    _this.handleToggle = function () {
      _this.setState({
        isOpen: !_this.state.isOpen,
        anchorNode: _reactDom.default.findDOMNode(_this.clickTextField).parentNode
      }, function () {
        return _this.choosePosition();
      });
    };

    _this.setAnchorWidth = function (elementAnchor) {
      var anchor = elementAnchor && elementAnchor.getBoundingClientRect();

      _this.setState({
        anchorWidth: anchor.width
      });
    };

    return _this;
  }

  var _proto = Select.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    prevState.selected !== this.state.selected && this.props.onSelect && this.props.onSelect(this.state.selected);
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props = this.props,
        buttonProps = _this$props.buttonProps,
        children = _this$props.children,
        className = _this$props.className,
        defaultValue = _this$props.defaultValue,
        isDynamic = _this$props.isDynamic,
        isMulti = _this$props.isMulti,
        listProps = _this$props.listProps,
        overlayProps = _this$props.overlayProps,
        props = _objectWithoutPropertiesLoose(_this$props, ["buttonProps", "children", "className", "defaultValue", "isDynamic", "isMulti", "listProps", "overlayProps"]);

    var _this$state3 = this.state,
        anchorNode = _this$state3.anchorNode,
        anchorWidth = _this$state3.anchorWidth,
        id = _this$state3.id,
        isOpen = _this$state3.isOpen,
        selected = _this$state3.selected,
        selectedIndex = _this$state3.selectedIndex;
    var otherProps = (0, _omit.default)(_extends({}, props), ['id', 'onSelect']);

    var currentValue = function currentValue() {
      if (!isMulti && selected.length) return selected[0].label;

      if (selected.length === 1) {
        return selected.length + " Item Selected";
      } else if (selected.length) {
        return selected.length + " Items Selected";
      }
    };

    var label = _react.default.createElement("div", {
      className: "md-select__label",
      id: id + "__label"
    }, currentValue() || defaultValue, _react.default.createElement(_.Icon, {
      name: "arrow-down_16"
    }));

    var text = _react.default.createElement(_.Button, _extends({
      active: isOpen,
      ariaLabelledBy: id + "__label",
      "aria-haspopup": "listbox",
      id: id,
      name: id,
      onClick: this.handleToggle,
      ref: function ref(_ref) {
        return _this2.clickTextField = _ref;
      }
    }, buttonProps), label);

    var dropdownElement = isOpen && _react.default.createElement(_.EventOverlay, _extends({
      allowClickAway: true,
      anchorNode: anchorNode,
      close: this.hidePopover,
      isDynamic: isDynamic,
      isOpen: isOpen
    }, overlayProps), _react.default.createElement(_.List, _extends({
      onSelect: this.handleSelect,
      style: {
        width: anchorWidth
      },
      ref: function ref(_ref2) {
        return _this2.list = _ref2;
      },
      role: "listbox",
      itemRole: "option",
      active: selectedIndex,
      "aria-labelledby": id + "__label",
      "aria-multiselectable": isMulti
    }, listProps), children));

    return _react.default.createElement(_SelectContext.default.Provider, {
      value: isMulti
    }, _react.default.createElement("div", _extends({
      className: 'md-input-container md-select' + ("" + (className && " " + className || ''))
    }, otherProps), text, dropdownElement));
  };

  return Select;
}(_react.default.Component);

Select.propTypes = {
  /** @prop Sets the Button props | null */
  buttonProps: _propTypes.default.shape({}),

  /** @prop Children nodes to render inside Select component | null */
  children: _propTypes.default.node,

  /** @prop Optional CSS class name | '' */
  className: _propTypes.default.string,

  /** @prop Set the default selected option | '' */
  defaultValue: _propTypes.default.string,

  /** @prop Set ID for Select Component | null */
  id: _propTypes.default.string,

  /** @prop Sets the Select EventOverlay to be dynamic | true */
  isDynamic: _propTypes.default.bool,

  /** @prop Optional prop to know if multiple Select children can be active | false */
  isMulti: _propTypes.default.bool,

  /** @prop Sets the List props | null */
  listProps: _propTypes.default.shape({}),

  /** @prop Callback function invoked when user selects an item | null */
  onSelect: _propTypes.default.func,

  /** @prop Sets the EventOverlay props | null */
  overlayProps: _propTypes.default.shape({})
};
Select.defaultProps = {
  buttonProps: null,
  children: null,
  className: '',
  defaultValue: '',
  id: null,
  isDynamic: true,
  isMulti: false,
  listProps: null,
  onSelect: null,
  overlayProps: null
};
Select.displayName = 'Select';
var _default = Select;
exports.default = _default;