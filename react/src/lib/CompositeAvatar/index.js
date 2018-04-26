import React from 'react';
import PropTypes from 'prop-types';

const CompositeAvatar = props => {
  const { children, size, className } = props;

  const isAvatar = () => {
    return children.reduce((prev, child) => prev && child.type.displayName === 'Avatar', true);
  };

  const getChildren = () => {
    if (children.length === 2 && isAvatar()) {
      return children;
    }
    throw new Error('Children should have 2 Avatar component');
  };

  return (
    <div
      className={
        'cui-composite-avatar' +
        ` cui-composite-avatar--${size}` +
        `${(className && ` ${className}`) || ''}`
      }
    >
      {getChildren()}
    </div>
  );
};

CompositeAvatar.displayName = 'CompositeAvatar';

CompositeAvatar.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

CompositeAvatar.defaultProps = {
  className: '',
  size: 'medium',
  children: null,
};

export default CompositeAvatar;
