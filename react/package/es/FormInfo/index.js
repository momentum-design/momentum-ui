/** @component form */
import React from 'react';
import PropTypes from 'prop-types';
/**
 * FormInfo is supplemental, organizational component used to help divide form
 **/

var FormInfo = function FormInfo(props) {
  var title = props.title,
      description = props.description;
  return /*#__PURE__*/React.createElement("div", {
    className: "section__info"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "section__title"
  }, title), description && /*#__PURE__*/React.createElement("p", {
    className: "section__description"
  }, description));
};

FormInfo.propTypes = {
  /** @prop Optional FormInfo description text | '' */
  description: PropTypes.string,

  /** @prop Optional FormInfo title | '' */
  title: PropTypes.string
};
FormInfo.defaultProps = {
  description: '',
  title: ''
};
FormInfo.displayName = 'FormInfo';
export default FormInfo;