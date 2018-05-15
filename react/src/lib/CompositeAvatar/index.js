import React from 'react';
import PropTypes from 'prop-types';

const CompositeAvatar = props => {
  const { children, size, className, overrideSize } = props;
  const sizeMap = {
    small: 28,
    medium: 40,
    large: 135,
  };
  const derivedSize = overrideSize || sizeMap[size];

  const isAvatar = () => {
    return children.reduce((prev, child) => prev && child.type.displayName === 'Avatar', true);
  };

  const getAvatarStyle = () => {
    return {
      height: `${derivedSize}px`,
      width: `${derivedSize}px`
    };
  };

  const getChildren = () => {
    if (children.length === 2 && isAvatar()) {
      return React.Children.map(children, (child) => {
        return React.cloneElement(child, { overrideSize: derivedSize / 1.5 });
      });
    }
    throw new Error('Children should have 2 Avatar component');
  };

  return (
    <div
      className={
        'cui-composite-avatar' +
        `${(className && ` ${className}`) || ''}`
      }
      style={getAvatarStyle()}
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
  overrideSize: PropTypes.number
};

CompositeAvatar.defaultProps = {
  className: '',
  size: 'medium',
  overrideSize: 0,
  children: null,
};

export default CompositeAvatar;
