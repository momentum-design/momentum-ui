import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@collab-ui/react';

const IconContent = props => {
  const {
    actionNode,
    className,
    icon,
    isProtected,
    loading,
    onClick,
    subtitle,
    title,
    ...otherProps
  } = props;

  const handleKeyDown = e => {
    if (
      e.which === 32
      || e.which === 13
      || e.charCode === 32
      || e.charCode === 13
    ) {
      onClick && onClick(e);
      e.preventDefault();
    }
  };

  return (
    <div>
      <div
        className={
          'cui-content-file' +
          `${(onClick && ' cui-content-file--clickable') || ''}` +
          `${(className && ` ${className}`) || ''}`
        }
        onClick={onClick}
        onKeyDown={handleKeyDown}
        role='presentation'
        {...otherProps}
      >
        {
          !isProtected && actionNode &&
          <div className='cui-content-file__icon'>
            {actionNode}
          </div>
        }
        <span>
          <Icon name={icon} />
        </span>
      </div>
      <div className='cui-content-file__info-container'>
        <span className='cui-content-file__title'>
          {loading ? 'Loading' : title}
        </span>
        <span className='cui-content-file__subtitle'> {subtitle} </span>
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
  onClick: null,
  subtitle: '',
  title: '',
};

IconContent.propTypes = {
  actionNode: PropTypes.node,
  className: PropTypes.string,
  icon: PropTypes.string,
  isProtected: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  subtitle: PropTypes.string,
  title: PropTypes.string,
};

IconContent.displayName = 'IconContent';

export default IconContent;