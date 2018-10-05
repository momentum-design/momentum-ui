import React from 'react';
import PropTypes from 'prop-types';

/**
 * @component CloseIcon
 * @variations collab-ui-react
 */

const CloseIcon = props => {
  const { className, onClick, ...otherHTMLProps } = props;

  return (
    <button
      className={
      `cui-close` +
      `${(className && ` ${className}`) || ''}`
      }
      onClick={onClick}
      {...otherHTMLProps}
    />
  );
};

CloseIcon.defaultProps = {
  onClick: () => {},
  className: '',
};

CloseIcon.propTypes = {
  /** @prop Handler when the user clicks the CloseIcon | () => {} */
  onClick: PropTypes.func,

  /** @prop Optional css class string | '' */
  className: PropTypes.string,

};

CloseIcon.displayName = 'CloseIcon';

export default CloseIcon;
