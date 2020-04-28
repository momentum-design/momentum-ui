function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/** @component button-group */
import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import qsa from 'dom-helpers/query/querySelectorAll';
import { UIDReset } from 'react-uid';
import ButtonGroupContext from "../ButtonGroupContext";
import SelectableContext from "../SelectableContext";

var ButtonGroup = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(ButtonGroup, _React$Component);

  ButtonGroup.getDerivedStateFromProps = function getDerivedStateFromProps(_ref, state) {
    var active = _ref.active;
    return active ? _extends({}, state, {
      bgContext: _extends({}, state.bgContext, {
        active: active
      })
    }) : state;
  };

  function ButtonGroup(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _this.determineInitialFocus = function () {
      var bgContext = _this.state.bgContext;
      var _this$props = _this.props,
          focusFirstQuery = _this$props.focusFirstQuery,
          focusOnLoad = _this$props.focusOnLoad;
      var items = qsa(_this.containerNode, focusFirstQuery || ".md-button:not(.disabled):not(:disabled)");
      var focus = bgContext.focus;

      if (items.length) {
        if (!focus) {
          focus = _this.getNextFocusedChild(items, items[0], 0);
        }

        if (focus && focusOnLoad) {
          _this.containerNode.querySelector("[data-md-event-key=\"" + focus + "\"]").focus();
        }
      }
    };

    _this.handleSelect = function (e, opts) {
      var _this$props2 = _this.props,
          highlightSelected = _this$props2.highlightSelected,
          onSelect = _this$props2.onSelect,
          type = _this$props2.type;
      var active = _this.state.bgContext.active;
      var eventKey = opts.eventKey;

      var items = _this.getFocusableItems();

      var index = items.indexOf(_this.containerNode.querySelector("[data-md-event-key=\"" + eventKey + "\"]"));

      _this.setFocus(items, index); // Don't do anything if onSelect Event Handler is present


      if (onSelect) {
        return onSelect(e, {
          eventKey: _this.getValue(items, index, 'event')
        });
      } // Don't do anything if index is the same or outside of the bounds


      if (eventKey === active || index < 0 || index > items.length - 1) return; // Call change event handler

      _this.setState(function (state) {
        return {
          bgContext: _extends({}, state.bgContext, {
            active: type === 'pill' ? false : highlightSelected && _this.getValue(items, index, 'event')
          })
        };
      });
    };

    _this.getValue = function (arr, index, attribute) {
      return arr[index].attributes["data-md-" + attribute + "-key"] && arr[index].attributes["data-md-" + attribute + "-key"].value;
    };

    _this.getIncludesFirstCharacter = function (str, char) {
      return str.charAt(0).toLowerCase().includes(char);
    };

    _this.setFocus = function (items, index) {
      _this.setState(function (state) {
        return {
          bgContext: _extends({}, state.bgContext, {
            focus: _this.getValue(items, index, 'event')
          })
        };
      });
    };

    _this.setActiveAndFocus = function (active, focus) {
      var _this$props3 = _this.props,
          type = _this$props3.type,
          highlightSelected = _this$props3.highlightSelected;
      _this._needsRefocus = false;

      _this.setState(function (state) {
        return {
          bgContext: _extends({}, state.bgContext, {
            active: type === 'pill' ? false : highlightSelected && active,
            focus: active || focus
          })
        };
      });
    };

    _this.setFocusByFirstCharacter = function (char, focusIdx, items, length) {
      var bgContext = _this.state.bgContext;
      var newIndex = items.reduce(function (agg, item, idx, arr) {
        var index = focusIdx + idx + 1 > length ? Math.abs(focusIdx + idx - length) : focusIdx + idx + 1;
        return !agg.length && _this.getValue(arr, index, 'keyboard') && _this.getIncludesFirstCharacter(_this.getValue(arr, index, 'keyboard'), char) ? agg.concat(_this.getValue(arr, index, 'event')) : agg;
      }, []);
      typeof newIndex[0] === 'string' && bgContext.focus !== newIndex[0] && _this.setState(function (state) {
        return {
          bgContext: _extends({}, state.bgContext, {
            focus: newIndex[0]
          })
        };
      });
    };

    _this.getFocusableItems = function () {
      if (!_this.containerNode) return null;
      var focusQuery = _this.props.focusQuery;
      var defaultItems = qsa(_this.containerNode, ".md-button:not(.disabled):not(:disabled)");
      var customItems = focusQuery && qsa(_this.containerNode, focusQuery) || [];
      return customItems.length ? customItems.filter(function (item) {
        return customItems.indexOf(item) >= 0;
      }) : defaultItems;
    };

    _this.handleKeyDown = function (e) {
      var focus = _this.state.bgContext.focus;
      var flag = false;
      var tgt = e.currentTarget;
      var char = e.key;

      var items = _this.getFocusableItems();

      var focusIdx = focus && items.indexOf(_this.containerNode.querySelector("[data-md-event-key=\"" + focus + "\"]")) || 0;
      var length = items.length && items.length - 1 || 0;

      var isPrintableCharacter = function isPrintableCharacter(str) {
        return str.length === 1 && str.match(/\S/);
      };

      switch (e.which) {
        case 38:
        case 37:
          _this.getNextFocusedChild(items, tgt, -1);

          _this._needsRefocus = true;
          flag = true;
          break;

        case 39:
        case 40:
          _this.getNextFocusedChild(items, tgt, 1);

          _this._needsRefocus = true;
          flag = true;
          break;

        default:
          if (isPrintableCharacter(char)) {
            _this.setFocusByFirstCharacter(char, focusIdx, items, length);

            _this._needsRefocus = true;
            flag = true;
          }

          break;
      }

      if (flag) {
        e.stopPropagation();
        e.preventDefault();
      }
    };

    _this.state = {
      bgContext: _extends({
        active: props.type === 'pill' ? false : props.highlightSelected && props.active,
        focus: props.active || null,
        isButtonGroup: true
      }, props.pillWidth && {
        width: props.pillWidth
      }),
      selectContext: {
        parentOnSelect: _this.handleSelect,
        parentKeyDown: _this.handleKeyDown
      }
    };
    return _this;
  }

  var _proto = ButtonGroup.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.containerNode && this.determineInitialFocus();
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    var bgContext = this.state.bgContext;
    var active = this.props.active;

    if (prevProps.active !== active) {
      this.setActiveAndFocus(active, focus);
    }

    if (!this._needsRefocus || !this.containerNode) return;

    if (bgContext.focus && prevState.bgContext.focus !== bgContext.focus) {
      this.containerNode.querySelector("[data-md-event-key=\"" + bgContext.focus + "\"]").focus();
    }
  };

  _proto.getNextFocusedChild = function getNextFocusedChild(items, current, offset) {
    if (!this.containerNode) return null;
    var bgContext = this.state.bgContext;
    var possibleIndex = items.indexOf(current) + offset;

    var getIndex = function getIndex() {
      if (possibleIndex < 0) {
        return items.length - 1;
      } else if (possibleIndex > items.length - 1) {
        return 0;
      } else return possibleIndex;
    };

    bgContext.focus !== this.getValue(items, getIndex(), 'event') && this.setState({
      bgContext: _extends({}, bgContext, {
        focus: this.getValue(items, getIndex(), 'event')
      })
    });
    return this.getValue(items, getIndex(), 'event');
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props4 = this.props,
        ariaLabel = _this$props4.ariaLabel,
        children = _this$props4.children,
        className = _this$props4.className,
        justified = _this$props4.justified,
        theme = _this$props4.theme,
        type = _this$props4.type,
        props = _objectWithoutPropertiesLoose(_this$props4, ["ariaLabel", "children", "className", "justified", "theme", "type"]);

    var _this$state = this.state,
        bgContext = _this$state.bgContext,
        selectContext = _this$state.selectContext;
    var otherProps = omit(_extends({}, props), ['active', 'focusOnLoad', 'focusFirstQuery', 'focusQuery', 'highlightSelected', 'onSelect', 'pillWidth']);
    return React.createElement(SelectableContext.Provider, {
      value: selectContext
    }, React.createElement("div", _extends({
      "aria-label": ariaLabel,
      className: 'md-button-group' + ("" + (theme && " md-button-group--" + theme || '')) + ("" + (justified && " md-button-group--justified" || '')) + ("" + (type && " md-button-group--" + type || '')) + ("" + (className && " " + className || '')),
      role: "group",
      ref: function ref(_ref2) {
        return _this2.containerNode = _ref2;
      }
    }, otherProps), React.createElement(UIDReset, null, React.createElement(ButtonGroupContext.Provider, {
      value: bgContext
    }, children))));
  };

  return ButtonGroup;
}(React.Component);

ButtonGroup.propTypes = {
  /** @prop Sets initial active Button by index | null */
  active: PropTypes.string,

  /** @prop Text to display for blindness accessibility features | '' */
  ariaLabel: PropTypes.string,

  /** @prop Children nodes to render inside ButtonGroup | null */
  children: PropTypes.node,

  /** @prop Optional css class string | '' */
  className: PropTypes.string,

  /** @prop Set focus to ButtonGroup when page is loaded | false */
  focusOnLoad: PropTypes.bool,

  /** @prop Queries children to find matching item to have focus | '' */
  focusFirstQuery: PropTypes.string,

  /** @prop Additional elements that can be focused by selector | '' */
  focusQuery: PropTypes.string,

  /** @prop Highlights the selected button within group | true */
  highlightSelected: PropTypes.bool,

  /** @prop Optional text-justified css styling | true */
  justified: PropTypes.bool,

  /** @prop Handler to be called when the user selects ButtonGroup | null */
  onSelect: PropTypes.func,

  /** @prop Sets width of a pill Button | '60px' */
  pillWidth: PropTypes.string,

  /** @prop Optional Button color theme for ButtonGroup | '' */
  theme: PropTypes.oneOf(['', 'dark']),

  /** @prop Optional Button type for ButtonGroup | '' */
  type: PropTypes.oneOf(['', 'pill'])
};
ButtonGroup.defaultProps = {
  active: '',
  ariaLabel: '',
  children: null,
  className: '',
  focusOnLoad: false,
  focusFirstQuery: '',
  focusQuery: '',
  highlightSelected: true,
  justified: true,
  onSelect: null,
  pillWidth: '60px',
  theme: '',
  type: ''
};
ButtonGroup.displayName = 'ButtonGroup';
export default ButtonGroup;