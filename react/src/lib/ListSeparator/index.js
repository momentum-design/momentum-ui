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
        ...lineColor && {color: lineColor},
        ...margin && {margin: margin},
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
              ...textColor && {color: textColor},
              ...textPadding && {padding: textPadding},
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
  lineColor: PropTypes.string,
  margin: PropTypes.string,
  text: PropTypes.string,
  textColor: PropTypes.string,
  textPadding:PropTypes.string,
};

ListSeparator.defaultProps = {
  children: null,
  className: null,
  lineColor: null,
  margin: null,
  text: null,
  textColor: null,
  textPadding: null,
};

ListSeparator.displayName = 'ListSeparator';

export default ListSeparator;