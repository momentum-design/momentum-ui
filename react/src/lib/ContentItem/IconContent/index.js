import React from 'react';
import PropTypes from 'prop-types';

const IconContent = props => {
  const {
    actionNode,
    className,
    icon,
    isProtected,
    loading,
    subtitle,
    title,
    ...otherProps
  } = props;

  return (
    <div>
      <div
        className={'cui-content-file' + `${(className && ` ${className}`) || ''}`}
        {...otherProps}
      >
        {
          !isProtected && actionNode &&
          <div className="cui-content-file__icon">
            {actionNode}
          </div>
        }
        <span>
          <i className={`icon ${icon}`} />
        </span>
      </div>
      <div className="cui-content-file__info-container">
        <span className="cui-content-file__title">
          {loading ? 'Loading' : title}
        </span>
        <span className="cui-content-file__subtitle"> {subtitle} </span>
      </div>
    </div>
  );
};

IconContent.defaultProps = {
  actionNode: null,
  className: '',
  icon: '',
  isProtected: null,
  loading: false,
  subtitle: '',
  title: '',
};

IconContent.propTypes = {
  actionNode: PropTypes.node,
  className: PropTypes.string,
  icon: PropTypes.string,
  isProtected: PropTypes.bool,
  loading: PropTypes.bool,
  subtitle: PropTypes.string,
  title: PropTypes.string,
};

IconContent.displayName = 'IconContent';

export default IconContent;
