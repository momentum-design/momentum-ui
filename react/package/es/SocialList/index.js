function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/** @component social-list */
import React from 'react';
import PropTypes from 'prop-types';

var SocialList = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(SocialList, _React$Component);

  function SocialList() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = SocialList.prototype;

  _proto.render = function render() {
    var children = this.props.children;
    return /*#__PURE__*/React.createElement("span", {
      className: "md-social__list"
    }, children);
  };

  return SocialList;
}(React.Component);

SocialList.propTypes = {
  /** @prop Children nodes to render inside SocialList | null */
  children: PropTypes.node
};
SocialList.defaultProps = {
  children: null
};
SocialList.displayName = 'SocialList';
export default SocialList;