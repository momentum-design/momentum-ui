function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/** @component breadcrumbs */
import React from 'react';
import PropTypes from 'prop-types';

var Breadcrumbs = /*#__PURE__*/function (_React$PureComponent) {
  _inheritsLoose(Breadcrumbs, _React$PureComponent);

  function Breadcrumbs() {
    return _React$PureComponent.apply(this, arguments) || this;
  }

  var _proto = Breadcrumbs.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        children = _this$props.children;
    var items = React.Children.map(children, function (child, idx) {
      if (children.length - 1 === idx || !children.length) {
        return React.cloneElement(child, {
          className: 'current'
        });
      }

      return child;
    });
    return React.createElement("ul", {
      className: 'md-breadcrumbs' + (" " + className)
    }, items);
  };

  return Breadcrumbs;
}(React.PureComponent);

Breadcrumbs.displayName = 'Breadcrumbs';
Breadcrumbs.propTypes = {
  /** @prop Children nodes to render inside Breadcrumbs | null */
  children: PropTypes.node,

  /** @prop Optional css class string | '' */
  className: PropTypes.string
};
Breadcrumbs.defaultProps = {
  children: null,
  className: ''
};
export default Breadcrumbs;