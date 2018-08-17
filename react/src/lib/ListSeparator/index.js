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
    textColor,
    lineColor,
    text,
    textPadding,
    ...otherProps
  } = props;

  return (
    <div
      className={
        `cui-list-separator` +
        `${text || children ? ' cui-list-separator--text' : ''}` +
        `${(className && ` ${className}`) || ''}`
      }
      style={{
        backgroundColor:!text && lineColor && lineColor,
        margin:text && '0',
      }}
      {...otherProps}
    >

      {
        children || text
        ?
          <span
            className='cui-list-separator__text'
            style={{
              color: textColor || '',
              padding: `8px ${textPadding}px`
            }}
          >
            {children ? children : text}
          </span>
        :
          null
      }
    </div>
  );
};

ListSeparator.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  textColor: PropTypes.string,
  lineColor: PropTypes.string,
  text: PropTypes.string,
  textPadding:PropTypes.string,
};

ListSeparator.defaultProps = {
  children: null,
  className: null,
  text: null,
};

ListSeparator.displayName = 'ListSeparator';

export default ListSeparator;