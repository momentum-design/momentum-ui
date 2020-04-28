/** @component loading-spinner */
import React from 'react';
import PropTypes from 'prop-types';

var Loading = function Loading(props) {
  var small = props.small;
  return React.createElement("div", {
    className: "md-loading" + ("" + (small ? ' md-loading--small' : ''))
  }, React.createElement("span", {
    className: "md-loading__icon"
  }), React.createElement("span", {
    className: "md-loading__icon"
  }), React.createElement("span", {
    className: "md-loading__icon"
  }));
};

Loading.propTypes = {
  /** @prop Prop to make the Loading animation small | false */
  small: PropTypes.bool
};
Loading.defaultProps = {
  small: false
};
Loading.displayName = 'Loading';
export default Loading;