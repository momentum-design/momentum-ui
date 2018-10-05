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
  /** @prop Sets the collapse css styling | true */
  collapse: PropTypes.bool,
  /** @prop Sets the positioning of the CollapseButton | 'left' */
  alignment: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
  /** @prop Handler to be called when the user taps the CollapseButton | null */
  onClick: PropTypes.func,
  /** @prop Optional css class string | '' */
  className: PropTypes.string,
};

export default CollapseButton;
