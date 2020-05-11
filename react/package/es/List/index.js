function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/** @component list-item */
import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import uniqueId from 'lodash/uniqueId';
import qsa from 'dom-helpers/query/querySelectorAll';
import SelectableContext from "../SelectableContext";
import ListContext from "../ListContext";

var List = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(List, _React$Component);

  List.getDerivedStateFromProps = function getDerivedStateFromProps(_ref, state) {
    var active = _ref.active;
    return active ? _extends({}, state, {
      listContext: _extends({}, state.listContext, {
        active: active
      })
    }) : state;
  };

  function List(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _this.determineInitialFocus = function () {
      var _this$props = _this.props,
          focusFirstQuery = _this$props.focusFirstQuery,
          shouldFocusInitial = _this$props.shouldFocusInitial;
      var listContext = _this.state.listContext;
      var items = qsa(_this.listNode, focusFirstQuery || ".md-list-item:not(.disabled):not(:disabled):not(.md-list-item--read-only)");
      var focus = listContext.focus;

      if (items.length) {
        if (!focus) {
          focus = _this.getNextFocusedChild(items, items[0], 0);
        }

        if (focus && shouldFocusInitial) {
          _this.listNode.querySelector("[data-md-event-key=\"" + focus + "\"]").focus();
        }
      }
    };

    _this.getIncludesFirstCharacter = function (str, char) {
      return str.charAt(0).toLowerCase().includes(char);
    };

    _this.getValue = function (arr, index, attribute) {
      return arr[index].attributes["data-md-" + attribute + "-key"] && arr[index].attributes["data-md-" + attribute + "-key"].value;
    };

    _this.getFocusableItems = function () {
      if (!_this.listNode) return null;
      var focusQuery = _this.props.focusQuery;
      var defaultItems = qsa(_this.listNode, ".md-list-item:not(.disabled):not(:disabled):not(.md-list-item--read-only)");
      var customItems = focusQuery && qsa(_this.listNode, focusQuery) || [];
      return customItems.length ? customItems.filter(function (item) {
        return customItems.indexOf(item) >= 0;
      }) : defaultItems;
    };

    _this.handleKeyDown = function (e) {
      var _this$props2 = _this.props,
          shouldFocusActive = _this$props2.shouldFocusActive,
          shouldPropagateKeyDown = _this$props2.shouldPropagateKeyDown;
      var focus = _this.state.listContext.focus;
      var clickEvent;
      var tgt = e.currentTarget;
      var char = e.key;

      var items = _this.getFocusableItems();

      var length = items.length && items.length - 1 || 0;
      var focusIdx = focus && items.indexOf(_this.listNode.querySelector("[data-md-event-key=\"" + focus + "\"]")) || 0;
      var flag = false;

      var isPrintableCharacter = function isPrintableCharacter(str) {
        return str.length === 1 && str.match(/\S/);
      };

      switch (e.which) {
        case 9:
          if (shouldFocusActive) {
            _this._needsRefocus = false;

            _this.setFocusToActive();
          }

          break;

        case 32:
        case 13:
          try {
            clickEvent = new MouseEvent('click', {
              view: window,
              bubbles: true,
              cancelable: true
            });
          } catch (err) {
            if (document.createEvent) {
              // DOM Level 3 for IE 9+
              clickEvent = document.createEvent('MouseEvents');
              clickEvent.initEvent('click', true, true);
            }
          }

          tgt.dispatchEvent(clickEvent);
          flag = true;
          break;

        case 38:
        case 37:
          _this.getNextFocusedChild(items, tgt, -1);

          _this._needsRefocus = true;
          if (!shouldPropagateKeyDown) flag = true;
          break;

        case 39:
        case 40:
          _this.getNextFocusedChild(items, tgt, 1);

          _this._needsRefocus = true;
          if (!shouldPropagateKeyDown) flag = true;
          break;

        case 33:
        case 36:
          _this.setFocusToLimit('start', items, length);

          _this._needsRefocus = true;
          flag = true;
          break;

        case 34:
        case 35:
          _this.setFocusToLimit('end', items, length);

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

    _this.handleSelect = function (e, opts) {
      var _this$props3 = _this.props,
          onSelect = _this$props3.onSelect,
          trackActive = _this$props3.trackActive;
      var active = _this.state.listContext.active;
      var eventKey = opts.eventKey,
          label = opts.label,
          value = opts.value;

      var items = _this.getFocusableItems();

      var index = items.findIndex(function (item) {
        return item.getAttribute('data-md-event-key') === eventKey || item.querySelector("[data-md-event-key=\"" + eventKey + "\"]");
      }); // Don't do anything if index is the same or outside of the bounds

      if (eventKey === active || index < 0 || index > items.length - 1) return;

      _this.setFocus(items, index); // Don't do anything if onSelect Event Handler is present


      if (onSelect) {
        return onSelect(e, {
          eventKey: _this.getValue(items, index, 'event'),
          label: label,
          value: value
        });
      } // Keep reference to last index for event handler


      var last = active; // Call change event handler

      trackActive && _this.setState(function (state) {
        return {
          last: last,
          listContext: _extends({}, state.listContext, {
            active: _this.getValue(items, index, 'event')
          })
        };
      });
    };

    _this.setFocus = function (items, index) {
      _this.setState(function (state) {
        return {
          listContext: _extends({}, state.listContext, {
            focus: _this.getValue(items, index, 'event')
          })
        };
      });
    };

    _this.setActiveAndFocus = function (active, focus) {
      _this._needsRefocus = false;

      _this.setState(function (state) {
        return {
          listContext: _extends({}, state.listContext, {
            active: active,
            focus: state.shouldFocusActive && active || focus
          })
        };
      });
    };

    _this.setFocusByFirstCharacter = function (char, focusIdx, items, length) {
      var listContext = _this.state.listContext;
      var newIndex = items.reduce(function (agg, item, idx, arr) {
        var index = focusIdx + idx + 1 > length ? Math.abs(focusIdx + idx - length) : focusIdx + idx + 1;
        return !agg.length && _this.getValue(arr, index, 'keyboard') && _this.getIncludesFirstCharacter(_this.getValue(arr, index, 'keyboard'), char) ? agg.concat(_this.getValue(arr, index, 'event')) : agg;
      }, []);
      typeof newIndex[0] === 'string' && listContext.focus !== newIndex[0] && _this.setState(function (state) {
        return {
          listContext: _extends({}, state.listContext, {
            focus: newIndex[0]
          })
        };
      });
    };

    _this.state = {
      id: props.id || uniqueId('md-list-'),
      last: 0,
      listContext: {
        active: props.active,
        focus: props.shouldFocusActive && props.active || props.focus,
        role: props.itemRole,
        type: props.type,
        ariaConfig: props.ariaConfig
      },
      selectContext: {
        parentKeyDown: _this.handleKeyDown,
        parentOnSelect: _this.handleSelect
      }
    };
    return _this;
  }

  var _proto = List.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var focusFirst = this.props.focusFirst;
    focusFirst && this.listNode && this.determineInitialFocus();
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    var listContext = this.state.listContext;
    var _this$props4 = this.props,
        active = _this$props4.active,
        focus = _this$props4.focus,
        shouldFocusActive = _this$props4.shouldFocusActive;

    if (shouldFocusActive && (prevProps.focus !== focus || prevProps.active !== active)) {
      this.setActiveAndFocus(active, focus);
    }

    if (!this._needsRefocus || !this.listNode) return;

    if (listContext.focus && prevState.listContext.focus !== listContext.focus) {
      this.listNode.querySelector("[data-md-event-key=\"" + listContext.focus + "\"]").focus();
    }
  };

  _proto.getNextFocusedChild = function getNextFocusedChild(items, current, offset) {
    if (!this.listNode) return null;
    var shouldLoop = this.props.shouldLoop;
    var listContext = this.state.listContext;
    var possibleIndex = items.indexOf(current) + offset;

    var getIndex = function getIndex() {
      if (possibleIndex < 0) {
        return shouldLoop ? items.length - 1 : 0;
      } else if (possibleIndex > items.length - 1) {
        return shouldLoop ? 0 : items.length - 1;
      } else return possibleIndex;
    };

    listContext.focus !== this.getValue(items, getIndex(), 'event') && this.setState({
      listContext: _extends({}, listContext, {
        focus: this.getValue(items, getIndex(), 'event')
      })
    });
    return this.getValue(items, getIndex(), 'event');
  };

  _proto.setFocusToActive = function setFocusToActive() {
    var focus = this.state.listContext.active;

    if (!focus) {
      var items = this.getFocusableItems();
      focus = this.getValue(items, 0, 'event');
    }

    this.setState({
      listContext: _extends({}, this.state.listContext, {
        focus: focus
      })
    });
  };

  _proto.setFocusToLimit = function setFocusToLimit(target, items, length) {
    var focus = this.state.listContext.focus;
    var index = target === 'start' ? 0 : length;
    var newFocusKey = this.getValue(items, index, 'event');
    newFocusKey !== focus && this.setState({
      listContext: _extends({}, this.state.listContext, {
        focus: newFocusKey
      })
    });
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props5 = this.props,
        active = _this$props5.active,
        children = _this$props5.children,
        className = _this$props5.className,
        role = _this$props5.role,
        tabType = _this$props5.tabType,
        wrap = _this$props5.wrap,
        props = _objectWithoutPropertiesLoose(_this$props5, ["active", "children", "className", "role", "tabType", "wrap"]);

    var _this$state = this.state,
        listContext = _this$state.listContext,
        selectContext = _this$state.selectContext;
    var otherProps = omit(_extends({}, props), ['ariaConfig', 'focusFirst', 'focusFirstQuery', 'focusQuery', 'itemRole', 'shouldPropagateKeyDown', 'shouldFocusActive', 'shouldFocusInitial', 'shouldLoop', 'trackActive', 'type']);

    var getActiveId = function getActiveId() {
      var activeNode = active && active.length && _this2.listNode && _this2.listNode.querySelector("[data-md-event-key=\"" + active[0] + "\"]");

      return activeNode && activeNode.id;
    };
    /* eslint-disable jsx-a11y/aria-activedescendant-has-tabindex */


    return React.createElement(SelectableContext.Provider, {
      value: selectContext
    }, React.createElement(ListContext.Provider, {
      value: listContext
    }, React.createElement("div", _extends({
      className: 'md-list' + ("" + (tabType && " md-list--" + tabType || '')) + ("" + (wrap && " md-list--wrap" || '')) + ("" + (className && " " + className || '')),
      role: role,
      "aria-activedescendant": getActiveId(),
      ref: function ref(_ref2) {
        return _this2.listNode = _ref2;
      }
    }, otherProps), children)));
    /* eslint-enable*/
  };

  return List;
}(React.Component);

List.propTypes = {
  /** @prop Optional active prop to pass active prop to children | null */
  active: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.number]),

  /** @prop Optional parameter for accessibility configuration | null */
  ariaConfig: PropTypes.object,

  /** @prop Children nodes to render inside List | null */
  children: PropTypes.node,

  /** @prop Optional css class string | '' */
  className: PropTypes.string,

  /** @prop Optional focus prop to pass focus prop to children | null */
  focus: PropTypes.string,

  /** @prop Sets first List item to have focus within List context | true */
  focusFirst: PropTypes.bool,

  /** @prop Queries children to find matching item to have focus | '' */
  focusFirstQuery: PropTypes.string,

  /** @prop Additional elements that can be focused by selector | '' */
  focusQuery: PropTypes.string,

  /** @prop Optional ID value of List | null */
  id: PropTypes.string,

  /** @prop Optional tabType prop type to manually set child role | 'listitem' */
  itemRole: PropTypes.string,

  /** @prop Callback function invoked by user selecting an interactive item within List | null */
  onSelect: PropTypes.func,

  /** @prop Disables the stopPropagation() & preventDefault() for ArrowKey Events | false */
  shouldPropagateKeyDown: PropTypes.bool,

  /** @prop Sets the ARIA role for the Nav, in the context of a TabContainer | 'list' */
  role: PropTypes.string,

  /** @prop Invokes dom focus method on mount | true */
  shouldFocusInitial: PropTypes.bool,

  /** @prop Determines if focus should revert to active on list exit | false */
  shouldFocusActive: PropTypes.bool,

  /** @prop Determines if keyboard navigation should loop through list | true */
  shouldLoop: PropTypes.bool,

  /** @prop Sets the orientation of the List | 'vertical' */
  tabType: PropTypes.oneOf(['vertical', 'horizontal']),

  /** @prop Determines if List wrapper should track active | true */
  trackActive: PropTypes.bool,

  /** @prop Sets List size | null */
  type: PropTypes.oneOf(['small', 'large', 'space', 'xlarge']),

  /** @prop Optional wrap prop type to wrap items to next row */
  wrap: PropTypes.bool
};
List.defaultProps = {
  active: null,
  ariaConfig: null,
  children: null,
  className: '',
  id: null,
  itemRole: 'listitem',
  focus: null,
  focusFirst: true,
  focusFirstQuery: '',
  focusQuery: '',
  onSelect: null,
  shouldPropagateKeyDown: false,
  role: 'list',
  shouldFocusActive: false,
  shouldFocusInitial: true,
  shouldLoop: true,
  tabType: 'vertical',
  trackActive: true,
  type: null,
  wrap: false
};
List.displayName = 'List';
export default List;