import React from 'react';
import PropTypes from 'prop-types';

/**
 * @category containers
 * @component list-separator
 * @variations collab-ui-react
 */

const ListSeparator = props => {
  const {
    children,
    className,
    lineColor,
    margin,
    textColor,
    text,
    textPadding,
    ...otherProps
  } = props;

  return (
    <div
      className={
        'cui-list-separator' +
        `${className && ` ${className}` || ''}`
      }
      style={{
        color: lineColor ? lineColor : '#EBEBEB',
        margin: margin && `${margin}px 0`
      }}
      {...otherProps}
    >

    <span className="cui-list-separator__container">
      {
        children || text
        &&
          <span
            className='cui-list-separator__text'
            style={{
              color: textColor ? textColor : '#666666',
              padding: textPadding && `0 ${textPadding}`
            }}
          >
            {children ? children : text}
          </span>
      }
      </span>
    </div>
  );
};

ListSeparator.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  textColor: PropTypes.string,
  lineColor: PropTypes.string,
  margin: PropTypes.string,
  text: PropTypes.string,
  textPadding:PropTypes.string,
};

ListSeparator.defaultProps = {
  children: null,
  className: null,
  margin: '0',
  text: null,
};

ListSeparator.displayName = 'ListSeparator';

export default ListSeparator;