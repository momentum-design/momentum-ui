import React from 'react';
import PropTypes from 'prop-types';
import '@collab-ui/icons/fonts/collab-ui-icons.svg';

const Icon = props => {

  const { name, size, className, color, ...otherHTMLProps  } = props;

  const getSize = (name, size) => {
    const defaultSize = 16;
    const sizeFromName = Number(name.split("_")[1]);
    return size || sizeFromName || defaultSize;
  };

  const computedSize = getSize(name, size);

  return (
    <svg
      className={
        `icon` +
        `${(color && ` cui-color--${color}`) || ''}` +
        `${(className && ` ${className}`) || ''}`
      }
      width={computedSize}
      height={computedSize}
      {...otherHTMLProps}>
        <use href={`#collab-ui-icons_${name}`} />
    </svg>
  );
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
  className: PropTypes.string
};

Icon.defaultProps = {
  color: '',
  className: ''
};

Icon.displayName = 'Icon';

export default Icon;
