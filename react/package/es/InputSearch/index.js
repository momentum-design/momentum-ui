function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/** @component input-search */
import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Input, Spinner } from "./..";

var SearchInput = function SearchInput(props) {
  var isLoading = props.isLoading,
      otherProps = _objectWithoutPropertiesLoose(props, ["isLoading"]);

  return React.createElement(Input, _extends({
    inputBefore: isLoading ? React.createElement(Spinner, {
      size: 20
    }) : React.createElement(Icon, {
      name: "search_20"
    })
  }, otherProps));
};

SearchInput.propTypes = {
  /** @prop Determines if spinner is present | false */
  isLoading: PropTypes.bool
};
SearchInput.defaultProps = {
  isLoading: false
};
SearchInput.displayName = 'SearchInput';
export default SearchInput;