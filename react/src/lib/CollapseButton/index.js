import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from '@collab-ui/react';

const CollapseButton = props => {
  const { collapse, alignment, onClick, className, ...otherProps } = props;

  const handleClick = () => {
    onClick && onClick();
  };

  const getIconName = () => {
    return collapse ? 'arrow-right-optical_14' : 'arrow-left-optical_14';
  };

  return (
    <Button
      ariaLabel={collapse ? 'expand' : 'collapse'}
      className={
        'cui-collapse-button' +
        ` cui-collapse-button--${alignment}` +
        `${(className && ` ${className}`) || ''}`
      }
      children={<Icon name={getIconName()}/>}
      onClick={() => handleClick()}
      {...otherProps}
    />
  );
};

CollapseButton.displayName = 'CollapseButton';

CollapseButton.defaultProps = {
  collapse: true,
  alignment: 'left',
  onClick: null,
  className: '',
};

CollapseButton.propTypes = {
  collapse: PropTypes.bool,
  alignment: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default CollapseButton;
