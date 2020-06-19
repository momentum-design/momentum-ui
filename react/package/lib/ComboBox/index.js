"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ = require("./..");

var _omit = _interopRequireDefault(require("lodash/omit"));

var _uniqueId = _interopRequireDefault(require("lodash/uniqueId"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var ComboBox = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(ComboBox, _React$Component);

  function ComboBox() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.state = {
      filteredOptions: [],
      focus: -1,
      id: _this.props.id || (0, _uniqueId.default)('md-combo-box-'),
      isOpen: false,
      value: ''
    };

    _this.mapOptionsToListItem = function () {
      var options = _this.props.options;
      return options.map(function (option, i) {
        return /*#__PURE__*/_react.default.createElement(_.ListItem, {
          key: i,
          label: option
        });
      });
    };

    _this.setFilteredOptions = function (filter) {
      var onChange = _this.props.onChange;
      var filteredOptions = !onChange ? _this.applyFilter(filter) : _this.options;

      _this.setState({
        isOpen: !!filteredOptions.length,
        filteredOptions: filteredOptions
      });
    };

    _this.hidePopover = function () {
      _this.setState({
        isOpen: false
      });
    };

    _this.handleToggle = function () {
      var filteredOptions = _this.state.filteredOptions;
      filteredOptions.length && _this.setState({
        isOpen: true
      });
    };

    _this.applyFilter = function (value) {
      var searchProp = _this.props.searchProp;

      var isSubString = function isSubString(string) {
        return value && string.toLowerCase().includes(value.toLowerCase());
      };

      return _this.options.filter(function (option) {
        return option.props[searchProp] && isSubString(option.props[searchProp]) || ['ListItemHeader'].includes(option.type.displayName);
      });
    };

    _this.handleChange = function (e) {
      var onChange = _this.props.onChange;
      var focus = _this.state.focus;

      _this.setFilteredOptions(e.target.value);

      _this.setState({
        value: e.target.value,
        focus: !onChange ? -1 : focus
      }, function () {
        return onChange && onChange(e, e.target.value);
      });
    };

    _this.handleClick = function (e, selectedOption) {
      var searchProp = _this.props.searchProp;
      var onSelect = _this.props.onSelect;

      _this.setFilteredOptions(selectedOption.props[searchProp]);

      _this.setState({
        value: selectedOption.props[searchProp],
        isOpen: false,
        focus: -1
      }, function () {
        return onSelect && onSelect(e, selectedOption);
      });
    };

    _this.setFocus = function (index) {
      _this.setState({
        focus: index
      });
    };

    _this.handleKeyDown = function (e) {
      var flag = false;
      var newIndex;
      var _this$state = _this.state,
          filteredOptions = _this$state.filteredOptions,
          focus = _this$state.focus,
          isOpen = _this$state.isOpen;
      var length = filteredOptions && filteredOptions.length - 1;

      var getNewIndex = function getNewIndex(currentIndex, change) {
        var getPossibleIndex = function getPossibleIndex() {
          if (currentIndex + change < 0) {
            return length;
          } else if (currentIndex + change > length) {
            return 0;
          }

          return currentIndex + change;
        };

        var possibleIndex = getPossibleIndex();

        var potentialTarget = _react.default.Children.toArray(filteredOptions)[possibleIndex];

        return potentialTarget.props.disabled || potentialTarget.props.isReadOnly ? getNewIndex(possibleIndex, change) : possibleIndex;
      };

      switch (e.which) {
        case 13:
          isOpen && focus !== -1 && _this.handleClick(e, filteredOptions[focus]);
          flag = true;
          break;

        case 38:
          if (isOpen) {
            newIndex = getNewIndex(focus, -1);

            _this.setFocus(newIndex);
          }

          flag = true;
          break;

        case 40:
          if (isOpen) {
            newIndex = getNewIndex(focus, 1);

            _this.setFocus(newIndex);
          }

          flag = true;
          break;

        default:
          break;
      }

      if (flag) {
        e.stopPropagation();
        e.preventDefault();
      }
    };

    return _this;
  }

  var _proto = ComboBox.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var children = this.props.children;
    this.options = children && _react.default.Children.toArray(children) || this.mapOptionsToListItem();
    this.setFilteredOptions();
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var _this$props = this.props,
        options = _this$props.options,
        children = _this$props.children;
    var value = this.state.value;

    if (prevProps.options !== options || prevProps.children !== children) {
      this.options = children && _react.default.Children.toArray(children) || this.mapOptionsToListItem();
      this.setFilteredOptions(value);
    }
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props2 = this.props,
        className = _this$props2.className,
        clear = _this$props2.clear,
        disabled = _this$props2.disabled,
        hasSearchIcon = _this$props2.hasSearchIcon,
        inputProps = _this$props2.inputProps,
        placeholder = _this$props2.placeholder,
        props = _objectWithoutPropertiesLoose(_this$props2, ["className", "clear", "disabled", "hasSearchIcon", "inputProps", "placeholder"]);

    var otherProps = (0, _omit.default)(_extends({}, props), ['children', 'id', 'onChange', 'onSelect', 'options', 'searchProp']);
    var _this$state2 = this.state,
        filteredOptions = _this$state2.filteredOptions,
        focus = _this$state2.focus,
        id = _this$state2.id,
        isOpen = _this$state2.isOpen,
        value = _this$state2.value;
    var activeDescendant = this.activeChild && this.activeChild.id;
    var InputComp = hasSearchIcon ? _.InputSearch : _.Input;

    var input = /*#__PURE__*/_react.default.createElement(InputComp, _extends({
      "aria-autocomplete": "list",
      clear: clear,
      disabled: disabled,
      inputRef: function inputRef(ref) {
        return _this2.anchorNode = ref;
      },
      onChange: this.handleChange,
      onClick: this.handleToggle,
      onKeyDown: this.handleKeyDown,
      placeholder: placeholder,
      value: value
    }, activeDescendant && {
      'aria-activedescendant': activeDescendant
    }, inputProps));

    var renderFilteredOption = filteredOptions && filteredOptions.map(function (option, i) {
      return /*#__PURE__*/_react.default.cloneElement(option, _extends({
        active: i === focus,
        key: i,
        onClick: function onClick(e) {
          return _this2.handleClick(e, option);
        },
        refName: 'option',
        role: 'option'
      }, focus === i && {
        ref: function ref(_ref) {
          return _this2.activeChild = _ref;
        }
      }));
    });

    var dropdownElement = this.anchorNode && isOpen && /*#__PURE__*/_react.default.createElement(_.EventOverlay, _extends({
      allowClickAway: true,
      anchorNode: this.anchorNode,
      close: this.hidePopover,
      isOpen: isOpen
    }, otherProps), /*#__PURE__*/_react.default.createElement("div", _extends({
      className: "md-combo-box__options",
      id: id,
      role: "listbox"
    }, this.anchorNode && {
      style: {
        width: this.anchorNode.getBoundingClientRect().width
      }
    }), renderFilteredOption));

    return /*#__PURE__*/_react.default.createElement("div", {
      "aria-controls": id,
      "aria-haspopup": "listbox",
      "aria-expanded": isOpen,
      className: 'md-combo-box' + ("" + (className && " " + className || '')),
      role: "combobox"
    }, input, dropdownElement);
  };

  return ComboBox;
}(_react.default.Component);

ComboBox.displayName = 'ComboBox';
ComboBox.propTypes = {
  /** @prop Children nodes to render inside ComboBox | null */
  children: _propTypes.default.node,

  /** @prop Optional css class string | '' */
  className: _propTypes.default.string,

  /** @prop Sets the initial input element as empty | false */
  clear: _propTypes.default.bool,

  /** @prop Sets the attribute disabled to the ComboBox | false */
  disabled: _propTypes.default.bool,

  /** @prop Sets the ComboBox to have a search icon | true */
  hasSearchIcon: _propTypes.default.bool,

  /** @prop Sets the ID of the ComboBox */
  id: _propTypes.default.string,

  /** @prop Collection of props unique for Input element | null */
  inputProps: _propTypes.default.shape({}),

  /** @prop Handler invoked when the user presses any key | null */
  onChange: _propTypes.default.func,

  /** @prop Handler invoked when the user selects the ComboBox | null  */
  onSelect: _propTypes.default.func,

  /** @prop Array of options for the ComboBox dropdown | [] */
  options: _propTypes.default.arrayOf(_propTypes.default.string),

  /** @prop Text that initially populates the input field for guidence | ''  */
  placeholder: _propTypes.default.string,

  /** @prop Sets the search prop | 'label' */
  searchProp: _propTypes.default.string,

  /** @prop Sets the target offset | { horizontal: 0, vertical: 4 } */
  targetOffset: _propTypes.default.shape({
    horizontal: _propTypes.default.number,
    vertical: _propTypes.default.number
  })
};
ComboBox.defaultProps = {
  children: null,
  className: '',
  clear: false,
  disabled: false,
  hasSearchIcon: true,
  id: null,
  inputProps: null,
  onChange: null,
  onSelect: null,
  options: [],
  placeholder: '',
  searchProp: 'label',
  targetOffset: {
    horizontal: 0,
    vertical: 4
  }
};
var _default = ComboBox;
exports.default = _default;