/** @component collapse-button */

import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from '@momentum-ui/react';

const CollapseButton = props => {
  const { 
    alignment,
    className,
    collapse,
    onClick,
    ...otherProps
  } = props;

  const handleClick = () => {
    onClick && onClick();
  };

  const getIconName = () => {
    return collapse ? 'panel-control-right_12' : 'panel-control-left_12';
  };

  return (
    <Button
      ariaLabel={collapse ? 'expand' : 'collapse'}
      className={
        'md-collapse-button' +
        ` md-collapse-button--${alignment}` +
        `${(className && ` ${className}`) || ''}`
      }
      children={<Icon name={getIconName()}/>}
      onClick={() => handleClick()}
      {...otherProps}
    />
  );
};

CollapseButton.propTypes = {
  /** @prop Sets the positioning of the CollapseButton | 'left' */
  alignment: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
  /** @prop Optional css class string | '' */
  className: PropTypes.string,
  /** @prop Sets the collapse css styling | true */
  collapse: PropTypes.bool,
  /** @prop Handler to be called when the user taps the CollapseButton | null */
  onClick: PropTypes.func,
};

CollapseButton.defaultProps = {
  alignment: 'left',
  className: '',
  collapse: true,
  onClick: null,
};

CollapseButton.displayName = 'CollapseButton';

export default CollapseButton;
