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
        `${(size && ` cui-composite-avatar--${size}`) || ''}` +
        `${(className && ` ${className}`) || ''}`
      }
    >
      {getChildren()}
    </div>
  );
};

CompositeAvatar.displayName = 'CompositeAvatar';

CompositeAvatar.propTypes = {
  /** @prop Children nodes to render inside CompositeAvatar | null */
  children: PropTypes.node,
  /** @prop Optional css class string | '' */
  className: PropTypes.string,
  /** @prop Sets the size of the CompositeAvatar | 'medium' */
  size: PropTypes.oneOf(['small', 'medium', 'large', 28, 40, 84, 135]),
};

CompositeAvatar.defaultProps = {
  className: '',
  size: 'medium',
  children: null,
};

export default CompositeAvatar;
